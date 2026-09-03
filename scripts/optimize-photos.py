"""Curate + optimize the Highlights shoot into public/photos and emit a TS manifest."""
import base64, io, os
from PIL import Image, ImageFilter

ROOT = "/Users/maoapp/learning/kalmi academic/caro-health"
SRC = os.path.join(ROOT, "pictures")
OUT = os.path.join(ROOT, "public/photos")
MANIFEST = os.path.join(ROOT, "src/lib/photos.ts")

# Curated frames, grouped by the natural "chapters" of the shoot.
SETS = {
    # Warm studio, cream set — reformer & cadillac
    "studio": [0, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
               21, 22, 23, 24, 27, 30, 31, 32, 34, 35, 36, 37],
    # Macro details — hands, feet, straps
    "detail": [25, 26, 28, 29, 33, 67, 69, 77, 84],
    # Lilac set — barre & reformer
    "lilac": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 54, 55, 56,
              57, 58, 59, 60, 61, 63, 64, 65],
    # White ballet dress — barre work
    "ballet": [66, 68, 70, 71, 73, 74, 75],
    # Black bodysuit — studio, high contrast
    "black": [76, 78, 79, 80, 81, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93,
              94, 95, 96],
    # Home mat practice
    "home": [97, 98, 99, 100, 101, 103, 104, 105, 106, 107, 108, 109, 110, 111,
             112, 113, 114, 115, 116],
    # Studio portraits on a grey backdrop
    "portrait": [117, 118, 119, 121, 122, 123, 125, 126, 127, 129],
}

# Frames used full-bleed get a larger source.
LARGE = {3, 34, 35, 36, 51, 59, 68, 75, 82, 85, 88, 91, 96, 103, 104, 119}

os.makedirs(OUT, exist_ok=True)

def src_path(n):
    return os.path.join(SRC, "xmajito.jpg" if n == 0 else f"xmajito-{n}.jpg")

def blur_uri(im):
    tiny = im.copy()
    tiny.thumbnail((14, 14))
    tiny = tiny.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO()
    tiny.save(buf, "JPEG", quality=42)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()

entries = []
groups = {}
total = 0

for group, ids in SETS.items():
    groups[group] = []
    for n in ids:
        p = src_path(n)
        if not os.path.exists(p):
            print("MISSING", p)
            continue
        im = Image.open(p)
        im = im.convert("RGB")
        edge = 2560 if n in LARGE else 1600
        im.thumbnail((edge, edge), Image.LANCZOS)
        name = f"p{n}.jpg"
        dest = os.path.join(OUT, name)
        im.save(dest, "JPEG", quality=80, optimize=True, progressive=True)
        total += os.path.getsize(dest)
        entries.append((n, group, im.width, im.height, blur_uri(im)))
        groups[group].append(n)

entries.sort(key=lambda e: e[0])

lines = [
    "// AUTO-GENERATED from the Highlights shoot — do not edit by hand.",
    "// Source frames live in /pictures (untracked); optimized output in /public/photos.",
    "",
    "export type Photo = {",
    "  id: number;",
    "  src: string;",
    "  w: number;",
    "  h: number;",
    "  blur: string;",
    '  set: "studio" | "detail" | "lilac" | "ballet" | "black" | "home" | "portrait";',
    "};",
    "",
    "export const PHOTOS: Record<number, Photo> = {",
]
for n, group, w, h, blur in entries:
    lines.append(
        f'  {n}: {{ id: {n}, src: "/photos/p{n}.jpg", w: {w}, h: {h}, '
        f'set: "{group}", blur: "{blur}" }},'
    )
lines.append("};")
lines.append("")
lines.append("/** Look up a frame by its shoot number. */")
lines.append("export function p(id: number): Photo {")
lines.append("  const found = PHOTOS[id];")
lines.append("  if (!found) throw new Error(`Unknown photo #${id}`);")
lines.append("  return found;")
lines.append("}")
lines.append("")
lines.append("/** Look up several frames at once. */")
lines.append("export const ps = (...ids: number[]): Photo[] => ids.map(p);")
lines.append("")

with open(MANIFEST, "w") as f:
    f.write("\n".join(lines))

print(f"{len(entries)} photos -> {total/1e6:.1f} MB")
