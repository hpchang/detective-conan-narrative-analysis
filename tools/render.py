"""Render the site photos into manga-style bitonal art. Run: python render.py <src_dir> <out_dir>"""
import sys, os
from manga import convert

src, out = sys.argv[1], sys.argv[2]
J = lambda d, f: os.path.join(d, f)

# Common look: 45 deg clustered-dot screentone at ~2.6 CSS px pitch (each file is
# rendered at 2x its on-page display width, so pitch = 5.2 device px everywhere).
COMMON = dict(pitch=5.2, ss=2, pre_med=7, thicken=2, line_sigma=2.0, tone_work=480, tone_med=5)

convert(J(src, 'floppy.jpg'), J(out, 'floppy.png'), 1700, **COMMON,
        levels=[(0.20, 1.0), (0.44, 0.50), (0.66, 0.22), (1.01, 0.0)],
        line_pct=5.5, gamma=1.35, white_cut=0.62, flatfield=0.12, flatfield_mix=0.5)

convert(J(src, 'vauxhall.jpg'), J(out, 'vauxhall.png'), 1700, **COMMON,
        levels=[(0.22, 1.0), (0.42, 0.50), (0.60, 0.22), (1.01, 0.0)],
        line_pct=6.5, gamma=1.75, flatfield=0.08, flatfield_mix=0.55)

# cropped to the two tapes: the wood table reads as noise at the 190px display size.
# rendered wider than 2x190 because .sidefig goes full-width under 620px; pitch is scaled
# to match so the dots still land at ~2.6 CSS px on the desktop layout.
convert(J(src, 'cassette.jpg'), J(out, 'cassette.png'), 640, ss=3, pitch=8.8,
        pre_med=5, thicken=2, line_sigma=1.7, tone_work=480, tone_med=5,
        crop=(0.209, 0.194, 0.800, 0.776),
        levels=[(0.24, 1.0), (0.48, 0.45), (0.70, 0.20), (1.01, 0.0)],
        line_pct=6.0, gamma=1.3, white_cut=0.66)
