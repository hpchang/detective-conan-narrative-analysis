"""Rebuild kakugyo.svg as manga line art: paper body, inked outline, screentone edge."""
import re
import sys

SRC, DST = sys.argv[1], sys.argv[2]
s = open(SRC).read()

d = {}
for m in re.finditer(r"<path\b.*?/>", s, re.S):
    tag = m.group(0)
    pid = re.search(r'id="([^"]+)"', tag).group(1)
    d[pid] = re.search(r'\sd="([^"]+)"', tag, re.S).group(1)

PAPER, INK = "#f4f1ea", "#121212"
PITCH, R = 0.53, 0.135          # user units: ~2.6 CSS px pitch at the 190px render size

out = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.549999 41.919998" role="img">
 <title>將棋的角行棋子</title>
 <defs>
  <pattern id="tone" width="{PITCH}" height="{PITCH}" patternUnits="userSpaceOnUse"
           patternTransform="rotate(45)">
   <circle cx="{PITCH/2}" cy="{PITCH/2}" r="{R}" fill="{INK}"/>
  </pattern>
 </defs>
 <g transform="translate(-85.737497,-165.14)" fill-rule="evenodd"
    stroke="{INK}" stroke-width="0.55" stroke-linejoin="round" stroke-linecap="round">
  <path d="{d['path13']}" fill="{PAPER}"/>
  <path d="{d['path45']}" fill="url(#tone)"/>
  <path d="{d['path2-2']}" fill="{INK}" stroke="none"/>
 </g>
</svg>
'''
open(DST, "w").write(out)
print(f"{DST}  {len(out)} bytes")
