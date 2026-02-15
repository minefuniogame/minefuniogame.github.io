import json
import os

# Load game data
with open("games.json", "r", encoding="utf-8") as f:
    games = json.load(f)

# Folder dyal output
os.makedirs("generated_pages", exist_ok=True)

for game in games:
    filename = "generated_pages/" + game["name"].lower().replace(" ", "-") + ".html"
    json_ld = json.dumps({
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game["name"],
        "url": game["url"],
        "image": game["image"],
        "description": game["description"],
        "applicationCategory": "Game",
        "operatingSystem": game["platform"],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": game["ratingValue"],
            "ratingCount": game["ratingCount"]
        }
    }, indent=2)

    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{game['name']}</title>
<script type="application/ld+json">
{json_ld}
</script>
</head>
<body>
<h1>{game['name']}</h1>
<p>{game['description']}</p>
<img src="{game['image']}" alt="{game['name']}">
<a href="{game['url']}">Play Now</a>
</body>
</html>
"""
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html_content)

print("All game pages generated with automatic JSON-LD!")
