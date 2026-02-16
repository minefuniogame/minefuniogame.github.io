import os
from datetime import date

BASE_URL = "https://minefuniogame.github.io"

today = date.today().isoformat()

games_urls = []

# Loop through game folders
for root, dirs, files in os.walk("game"):
    if "index.html" in files:
        slug = root.replace("\\", "/")
        games_urls.append(f"{BASE_URL}/{slug}/")

# --- Create sitemap-games.xml ---
with open("sitemap-games.xml", "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

    # Homepage
    f.write("  <url>\n")
    f.write(f"    <loc>{BASE_URL}/</loc>\n")
    f.write(f"    <lastmod>{today}</lastmod>\n")
    f.write("    <changefreq>daily</changefreq>\n")
    f.write("    <priority>1.0</priority>\n")
    f.write("  </url>\n")

    # Games
    for url in games_urls:
        f.write("  <url>\n")
        f.write(f"    <loc>{url}</loc>\n")
        f.write(f"    <lastmod>{today}</lastmod>\n")
        f.write("    <changefreq>weekly</changefreq>\n")
        f.write("    <priority>0.9</priority>\n")
        f.write("  </url>\n")

    f.write("</urlset>")

# --- Create sitemap.xml (index) ---
with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    f.write("  <sitemap>\n")
    f.write(f"    <loc>{BASE_URL}/sitemap-games.xml</loc>\n")
    f.write(f"    <lastmod>{today}</lastmod>\n")
    f.write("  </sitemap>\n")
    f.write("</sitemapindex>")
