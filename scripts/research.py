"""Archive the public source content and assets for this authorized redesign."""
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlparse
import html
import json
import re
import subprocess
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "content" / "source"
IMAGES = ROOT / "public" / "images"
OUT.mkdir(parents=True, exist_ok=True)
IMAGES.mkdir(parents=True, exist_ok=True)

def fetch(url):
    return subprocess.run(["curl", "-L", "--fail", "--max-time", "40", "-sS", url], check=True, capture_output=True).stdout

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(); self.images = {}; self.links = set(); self.videos = set(); self.text = []; self.skip = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript"): self.skip += 1
        if tag in ("p", "h1", "h2", "h3", "h4", "li", "br", "div", "section"): self.text.append("\n")
        if tag == "img":
            src = a.get("data-src") or a.get("src", "")
            if src.startswith("https://kekmano.hu/wp-content/"): self.images[src] = a.get("alt", "")
        if tag in ("a", "iframe", "video", "source"):
            url = a.get("href") or a.get("src") or a.get("data-src") or ""
            if url: self.links.add(url)
            if any(v in url for v in ("youtube", "youtu.be", ".mp4", "vimeo")): self.videos.add(url)
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript"): self.skip = max(0, self.skip - 1)
        if tag in ("p", "h1", "h2", "h3", "h4", "li", "div", "section"): self.text.append("\n")
    def handle_data(self, data):
        if not self.skip: self.text.append(data)

ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9", "i": "http://www.google.com/schemas/sitemap-image/1.1"}
sitemap = ET.fromstring(Path("/tmp/kekmano-sitemap.xml").read_text())
urls = [u.find("s:loc", ns).text for u in sitemap.findall("s:url", ns)]
urls.append("https://kekmano.hu/adatkezelesi-tajekoztato/")
all_images = {i.text: "Kék Manó — eredeti weboldal" for i in sitemap.findall(".//i:loc", ns)}
pages = []

def archive(url):
    slug = urlparse(url).path.strip("/") or "index"
    try:
        raw = fetch(url).decode("utf-8")
        (OUT / f"{slug}.html").write_text(raw)
        parser = Extractor(); parser.feed(raw)
        text = re.sub(r"[\t ]+", " ", "".join(parser.text))
        text = re.sub(r"\n\s*\n+", "\n\n", text).strip()
        (OUT / f"{slug}.txt").write_text(text)
        return {"url": url, "slug": slug, "images": parser.images, "links": sorted(parser.links), "videos": sorted(parser.videos)}
    except Exception as error:
        return {"url": url, "error": str(error)}

with ThreadPoolExecutor(max_workers=6) as pool:
    pages = list(pool.map(archive, urls))
for page in pages: all_images.update(page.get("images", {}))

def download(pair):
    url, alt = pair
    name = urlparse(url).path.rsplit("/", 1)[-1]
    try:
        dest = IMAGES / name
        if not dest.exists(): dest.write_bytes(fetch(url))
        return {"file": f"/images/{name}", "source": url, "alt": alt}
    except Exception as error:
        return {"source": url, "error": str(error)}

with ThreadPoolExecutor(max_workers=8) as pool:
    assets = list(pool.map(download, all_images.items()))
(OUT / "inventory.json").write_text(json.dumps({"pages": pages, "assets": assets}, ensure_ascii=False, indent=2))
print(json.dumps({"pages": [{"url": p["url"], "error": p.get("error"), "videos": p.get("videos", [])} for p in pages], "asset_count": len(assets), "failed_assets": [a for a in assets if "error" in a]}, ensure_ascii=False, indent=2))
