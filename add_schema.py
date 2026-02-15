import json
import os
from bs4 import BeautifulSoup

try:
    # Load games.json
    with open("js/games.json", "r", encoding="utf-8") as f:
        games = json.load(f)

    # --- Add schema to each game page ---
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

            # Create enhanced schema for SEO
            schema_data = {
                "@context": "https://schema.org",
                "@type": "VideoGame",
                "name": game["title"],
                "url": f"https://minefuniogame.github.io{game['link']}",
                "image": f"https://minefuniogame.github.io{game['thumbnail']}",
                "description": game.get("description"),
                "genre": game.get("genre", "Online Io Game"),
                "platform": game.get("platform")
                # "keywords": game.get("keywords")
            }

            script_tag = soup.new_tag("script", type="application/ld+json")
            script_tag.string = json.dumps(schema_data, indent=2)
            soup.head.append(script_tag)

            with open(html_path, "w", encoding="utf-8") as file:
                file.write(str(soup))

            print(f"✅ Schema added to {html_path}")
        else:
            print(f"❌ File not found: {html_path}")

    # --- Add ItemList schema to homepage ---
    homepage_path = "index.html"
    if os.path.exists(homepage_path):
        with open(homepage_path, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f, "html.parser")

        # Remove old schema
        old_schema = soup.find("script", type="application/ld+json")
        if old_schema:
            old_schema.decompose()

        # Build ItemList schema for homepage with description
        itemlist_schema = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Mine Fun IO",
            "genre": "Multiplayer, Action, Io",
            "url": "https://minefuniogame.github.io/",
            "description": "Master Mine Fun Io with our ultimate guide. Learn mining strategies, and explore all game modes in this addictive voxel-based .io classic.",
            "numberOfItems": len(games),
            "itemListElement": [
                {
                    "@type": "VideoGame",
                    "position": i+1,
                    "name": game["title"],
                    "url": f"https://minefuniogame.github.io{game['link']}",
                    "description": game.get("description", ""),
                    "genre": game.get("genre", "Online Io Game"),
                    "platform": game.get("platform", "web")
                }
                for i, game in enumerate(games)
            ]
        }

        script_tag = soup.new_tag("script", type="application/ld+json")
        script_tag.string = json.dumps(itemlist_schema, indent=2)
        soup.head.append(script_tag)

        with open(homepage_path, "w", encoding="utf-8") as f:
            f.write(str(soup))

        print("✅ Homepage schema added")
    else:
        print(f"❌ Homepage file not found: {homepage_path}")

except Exception as e:
    print(f"⚠️ An error occurred: {e}")
