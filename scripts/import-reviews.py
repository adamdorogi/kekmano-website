"""Import attributed reviews and public profile photos from the archived source."""

from concurrent.futures import ThreadPoolExecutor
import html
import json
from pathlib import Path
import re
import subprocess
import tempfile
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / "content/source/index.html").read_text()
reviews = []

for part in re.split(r'<div class="ti-review-item source-Google ', source)[1:]:
    profile = re.search(r'<div class="ti-profile-img">\s*<img\b([^>]+)>', part)
    content = re.search(r"<!-- R-CONTENT -->(.*?)<!-- R-CONTENT -->", part, re.S)
    if not profile or not content:
        continue
    attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', profile[1]))
    name = html.unescape(attrs.get("alt", "")).removesuffix(" profile picture")
    if any(review["name"] == name for review in reviews):
        continue
    origin = html.unescape(attrs.get("srcset", attrs.get("src", "")).split(" ")[0])
    text = " ".join(html.unescape(re.sub("<[^>]+>", " ", content[1])).split())
    reviews.append({"name": name, "text": text, "origin": origin, "photo": None})

destination = ROOT / "public/images/reviewers"
destination.mkdir(exist_ok=True)


def download(review):
    # The source uses /a/ for Google initial tiles and /a-/ for uploaded avatars.
    if not review["origin"].startswith("https://lh3.googleusercontent.com/a-/"):
        return
    slug = re.sub(
        "[^a-z0-9]+",
        "-",
        unicodedata.normalize("NFKD", review["name"])
        .encode("ascii", "ignore")
        .decode()
        .lower(),
    ).strip("-")
    with tempfile.TemporaryDirectory(prefix="kekmano-avatar-") as directory:
        temporary = Path(directory) / "photo"
        result = subprocess.run(
            [
                "curl", "-L", "--fail", "--silent", "--show-error",
                "--max-time", "30", review["origin"], "-o", str(temporary),
            ],
            capture_output=True,
            text=True,
        )
        if result.returncode:
            print(f"Profile unavailable: {review['name']}: {result.stderr.strip()}")
            return
        data = temporary.read_bytes()
        extension = (
            "jpg" if data.startswith(b"\xff\xd8\xff")
            else "png" if data.startswith(b"\x89PNG\r\n\x1a\n")
            else "webp" if data.startswith(b"RIFF") and data[8:12] == b"WEBP"
            else None
        )
        if not extension:
            print(f"Unsupported profile image: {review['name']}")
            return
        filename = f"{slug}.{extension}"
        (destination / filename).write_bytes(data)
        review["photo"] = f"/images/reviewers/{filename}"
        print(f"Downloaded {review['name']}: {len(data)} bytes")


with ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(download, reviews))

(ROOT / "content/source/review-sources.json").write_text(
    json.dumps(reviews, ensure_ascii=False, indent=2) + "\n"
)
(ROOT / "content/reviews.json").write_text(
    json.dumps(
        [{key: review[key] for key in ("name", "text", "photo")} for review in reviews],
        ensure_ascii=False, indent=2,
    ) + "\n"
)
print(f"Imported {len(reviews)} reviews; {sum(bool(r['photo']) for r in reviews)} photos")
