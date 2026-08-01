#!/usr/bin/env python
"""Photo -> shonen-manga style bitonal art (line art + clustered-dot screentone)."""
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, median_filter, grey_closing


def load_gray(path, out_w, crop=None):
    im = Image.open(path).convert("RGB")
    if crop:                       # (left, top, right, bottom) as fractions
        w, h = im.size
        l, t, r, b = crop
        im = im.crop((round(l * w), round(t * h), round(r * w), round(b * h)))
    w, h = im.size
    out_h = round(h * out_w / w)
    im = im.resize((out_w, out_h), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32) / 255.0
    return 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]


def normalize(g, lo=1.0, hi=99.0):
    a, b = np.percentile(g, lo), np.percentile(g, hi)
    if b - a < 1e-6:
        return g
    return np.clip((g - a) / (b - a), 0, 1)


def denoise(g, med=5, passes=2):
    for _ in range(passes):
        g = median_filter(g, size=med)
    return g


def xdog(g, sigma=1.0, k=1.6, p=22.0, thresh_pct=6.0):
    """Binary line mask (True = ink) from an extended difference-of-Gaussians."""
    u = (1.0 + p) * gaussian_filter(g, sigma) - p * gaussian_filter(g, sigma * k)
    return u < np.percentile(u, thresh_pct)


def halftone(coverage, pitch, angle=45.0):
    """Clustered-dot screen: coverage in [0,1] per pixel -> bool ink mask."""
    h, w = coverage.shape
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    t = np.deg2rad(angle)
    u = (x * np.cos(t) + y * np.sin(t)) * (2 * np.pi / pitch)
    v = (-x * np.sin(t) + y * np.cos(t)) * (2 * np.pi / pitch)
    s = ((np.cos(u) + np.cos(v)) / 2.0 + 1.0) / 2.0
    return s > (1.0 - coverage)


def tone_map(f, levels):
    """levels: [(upper_luma_bound, ink_coverage), ...] dark -> light."""
    cov = np.zeros_like(f)
    prev = -1.0
    for bound, c in levels:
        cov[(f > prev) & (f <= bound)] = c
        prev = bound
    return cov


DEFAULT_LEVELS = [(0.16, 1.00), (0.40, 0.50), (0.62, 0.26), (0.84, 0.11), (1.01, 0.0)]


def _shrink(a, ss):
    """Area-average downsample by integer factor ss."""
    h, w = a.shape
    h -= h % ss
    w -= w % ss
    return a[:h, :w].reshape(h // ss, ss, w // ss, ss).mean(axis=(1, 3))


def _resize(a, w, h, mode=Image.BILINEAR):
    im = Image.fromarray(np.clip(a * 255, 0, 255).astype(np.uint8), mode="L")
    return np.asarray(im.resize((w, h), mode)).astype(np.float32) / 255.0


def flatten_tone(g, out_w, out_h, work_w=420, med=5, passes=2, blur=1.0):
    """Flatten to broad manga tone patches; done small, so it is fast and flat."""
    h, w = g.shape
    tw = min(work_w, w)
    th = max(1, round(h * tw / w))
    s = _resize(g, tw, th, Image.BOX)
    for _ in range(passes):
        s = median_filter(s, size=med)
    if blur:
        s = gaussian_filter(s, blur)
    return _resize(s, out_w, out_h)


PAPER = (244, 241, 234)
INK = (18, 18, 18)


def convert(src, dst, out_w, *,
            pitch=5.2,                 # screentone dot pitch, final px
            ss=2,                      # supersampling factor for the line art
            norm=(1.0, 99.0),          # contrast stretch percentiles
            gamma=1.0,                 # >1 brightens (more white paper)
            pre_med=3, pre_passes=2,   # texture removal before line art
            line_sigma=1.0, line_p=22.0, line_pct=6.0, thicken=0, line_keep=0.30,
            tone_work=420, tone_med=5, tone_passes=2, tone_blur=1.0,
            levels=None, white_cut=None, black_cut=None,
            flatfield=0.0, flatfield_mix=1.0, crop=None,
            border_white=True, paper=PAPER, ink=INK):
    big_w = out_w * ss
    g = load_gray(src, big_w, crop=crop)
    if flatfield:                    # kill large-scale lighting gradients (backlit shots)
        illum = gaussian_filter(g, flatfield * big_w) + 1e-3
        ff = np.clip(g / illum * illum.mean(), 0, 1)
        g = flatfield_mix * ff + (1 - flatfield_mix) * g
    g = normalize(g, *norm)
    if gamma != 1.0:
        g = g ** (1.0 / gamma)

    base = denoise(g, med=pre_med * ss // 2 * 2 + 1, passes=pre_passes)
    lines = xdog(base, sigma=line_sigma * ss, p=line_p, thresh_pct=line_pct)
    if thicken:
        lines = grey_closing(lines.astype(np.uint8), size=thicken * ss) > 0
    lines_s = _shrink(lines.astype(np.float32), ss) > line_keep

    out_h = lines_s.shape[0]
    f = flatten_tone(g, out_w, out_h, work_w=tone_work, med=tone_med,
                     passes=tone_passes, blur=tone_blur)
    cov = tone_map(f, levels or DEFAULT_LEVELS)
    if white_cut is not None:
        cov[f >= white_cut] = 0.0
    if black_cut is not None:
        cov[f <= black_cut] = 1.0

    ink_mask = lines_s | halftone(cov, pitch)

    if border_white:                              # clear stray ink at the frame edge
        h, w = ink_mask.shape
        b = max(1, round(min(h, w) * 0.004))
        ink_mask[:b, :] = ink_mask[-b:, :] = ink_mask[:, :b] = ink_mask[:, -b:] = False

    idx = ink_mask.astype(np.uint8)
    im = Image.fromarray(idx, mode="P")
    im.putpalette(list(paper) + list(ink) + [0] * (256 * 3 - 6))
    im.save(dst, optimize=True, bits=1)
    print(f"{dst}  {idx.shape[1]}x{idx.shape[0]}  ink={ink_mask.mean()*100:.1f}%")
