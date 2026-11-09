"""Downsample raster images while retaining the PDF's text and page structure."""
import io
import sys

import fitz
from PIL import Image

source, target = sys.argv[1:3]
document = fitz.open(source)
seen = set()

for page in document:
    for image in page.get_images(full=True):
        xref = image[0]
        if xref in seen:
            continue
        seen.add(xref)
        extracted = document.extract_image(xref)
        try:
            raster = Image.open(io.BytesIO(extracted["image"]))
            raster.load()
        except Exception:
            continue
        if raster.mode not in ("RGB", "L"):
            background = Image.new("RGB", raster.size, "white")
            if "A" in raster.mode:
                background.paste(raster, mask=raster.getchannel("A"))
            else:
                background.paste(raster.convert("RGB"))
            raster = background
        elif raster.mode == "L":
            raster = raster.convert("RGB")
        raster.thumbnail((620, 620), Image.Resampling.LANCZOS)
        output = io.BytesIO()
        raster.save(output, "JPEG", quality=28, optimize=True, progressive=True)
        page.replace_image(xref, stream=output.getvalue())

document.save(target, garbage=4, clean=True, deflate=True, deflate_images=True, deflate_fonts=True)
