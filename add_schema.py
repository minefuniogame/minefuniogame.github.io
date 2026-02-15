import json
import os
from bs4 import BeautifulSoup

# Load games.json
with open("js/games.json", "r", encoding="utf-8") as f:
    games = json.load(f)

for game in games:
    slug = game["link"].replace("/game/", "").replace("/", "")
    html_path = f"game/{slug}/index.html"

    if os.path.exists(html_path):

        with open(html_path, "r", encoding="utf-8") as file:
            soup = BeautifulSoup(file, "html.parser")

        # Remove old schema if exists
        old_schema = soup.find("script", type="application/ld+json")
        if old_schema:
            old_schema.decompose()

        # Create new schema
        schema_data = {
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": game["title"],
            "url": f"https://minefuniogame.github.io{game['link']}",
            "image": f"https://minefuniogame.github.io{game['thumbnail']}",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": str(game["rating"]),
                "reviewCount": "100"
            }
        }

        script_tag = soup.new_tag("script", type="application/ld+json")
        script_tag.string = json.dumps(schema_data, indent=2)

        soup.head.append(script_tag)

        with open(html_path, "w", encoding="utf-8") as file:
            file.write(str(soup))

        print(f"✅ Schema added to {html_path}")

    else:
        print(f"❌ File not found: {html_path}")
