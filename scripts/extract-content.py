"""One-time content migration. Requires beautifulsoup4 (not an app dependency)."""
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content/source"

def clean_html(node):
    soup = BeautifulSoup(str(node), "html.parser")
    allowed = {"p", "strong", "em", "br", "ul", "ol", "li", "a", "h2", "h3", "h4"}
    for tag in list(soup.find_all(True)):
        if tag.name in {"script", "style", "img", "iframe", "button", "input", "select"}:
            tag.decompose(); continue
        if tag.name not in allowed: tag.unwrap(); continue
        href = tag.get("href")
        tag.attrs = {}
        if tag.name == "a" and href:
            if href.startswith("https://kekmano.hu/"): href = href.replace("https://kekmano.hu", "", 1)
            if href.startswith(("/", "#", "https://", "mailto:", "tel:")):
                tag["href"] = href
                if href.startswith("https://"): tag["rel"] = "noopener noreferrer"
    return str(soup)

faqs = {}
for slug in ["dugulaselharitas-budapest", "woma-csatornatisztitas-budapest", "csatorna-kamerazas-budapest"]:
    soup = BeautifulSoup((SOURCE / f"{slug}.html").read_text(), "html.parser")
    entries = []
    for toggle in soup.select("#main-content .et_pb_toggle"):
        title = toggle.select_one(".et_pb_toggle_title")
        body = toggle.select_one(".et_pb_toggle_content")
        if title and body: entries.append({"question": title.get_text(" ", strip=True), "html": clean_html(body)})
    for item in entries:
        item["html"] = item["html"].replace("Több, mint 24 éves tapasztalattal rendelkezünk", "2004 óta foglalkozunk duguláselhárítással").replace("24 éves tapasztalataink alapján", "Szakmai tapasztalataink alapján")
        if item["question"] == "Hogyan tudjuk a kisebb dugulásokat házilag elhárítani?":
            item["html"] = "<p>A könnyen hozzáférhető szennyeződések eltávolítása és a szifon szakszerű tisztítása kisebb problémánál segíthet. Csak a lefolyó és a cső anyagához megfelelő tisztítási módot használjon. Forrásban lévő vízzel ne kísérletezzen, és különböző vegyszereket soha ne keverjen.</p><p>A tisztítószer csomagolásán lévő használati és biztonsági útmutatót mindig tartsa be. A házi megoldások nem helyettesítik a szakszerű tisztítást. Ha a dugulás visszatér, több lefolyót érint, vagy bizonytalan a teendőben, hívjon szakembert. A kád, zuhanytálca és mosdó tartós duguláselhárítását megfelelő eszközökkel vállaljuk.</p>"
    faqs[slug] = entries
(ROOT / "content/original-faqs.json").write_text(json.dumps(faqs, ensure_ascii=False, indent=2))

privacy = BeautifulSoup((SOURCE / "adatkezelesi-tajekoztato.html").read_text(), "html.parser")
entry = privacy.select_one("#main-content .entry-content") or privacy.select_one("#main-content")
(ROOT / "content/privacy.json").write_text(json.dumps({"source": "https://kekmano.hu/adatkezelesi-tajekoztato/", "html": clean_html(entry)}, ensure_ascii=False, indent=2))

gallery = []
seen = set()
for slug in ["index", "dugulaselharitas-budapest", "woma-csatornatisztitas-budapest", "csatorna-kamerazas-budapest", "csepregi-gyuri", "referencia-videok"]:
    page = BeautifulSoup((SOURCE / f"{slug}.html").read_text(), "html.parser")
    for link in page.select("#main-content a[href]"):
        href = link["href"]
        if "/wp-content/uploads/" not in href or not re.search(r"\.(?:jpe?g|png)$", href, re.I): continue
        if href in seen: continue
        seen.add(href)
        image = link.find("img")
        if not image: continue
        gallery.append({"src": "/images/" + href.rsplit("/", 1)[-1], "alt": image.get("alt") or "Kék Manó – helyszíni munkafotó", "year": re.search(r"uploads/(\d{4})/", href).group(1)})

videos = []
vsoup = BeautifulSoup((SOURCE / "referencia-videok.html").read_text(), "html.parser")
for frame in vsoup.select("#main-content iframe"):
    src = frame.get("src") or frame.get("data-src", "")
    if "youtube.com/embed/" not in src: continue
    vid = src.split("/embed/")[1].split("?")[0]
    videos.append({"id": vid, "title": frame.get("title") or "Kék Manó – referencia videó"})
(ROOT / "content/references.json").write_text(json.dumps({"gallery": gallery, "videos": videos}, ensure_ascii=False, indent=2))
print(json.dumps({"faq_counts": {k: len(v) for k, v in faqs.items()}, "privacy_characters": len(clean_html(entry)), "gallery": len(gallery), "videos": videos}, ensure_ascii=False, indent=2))
