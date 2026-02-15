import json
from bs4 import BeautifulSoup

with open('games.json', 'r') as f:
    games = json.load(f)

for game in games:
    html_file = game['link'].lstrip('/')  # مثال: "game/diep-io/"
    try:
        with open(html_file + 'index.html', 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        script_tag = soup.new_tag('script', type='application/ld+json')
        script_tag.string = json.dumps({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": game['title'],
            "url": f"https://minefuniogame.github.io/{html_file}",
            "image": f"https://minefuniogame.github.io{game['thumbnail']}",
            "description": game.get('description', ''),
            "genre": game.get('genre', 'Multiplayer'),
            "author": {"@type": "Organization", "name": "MineFun Game Hub"},
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": str(game['rating']),
                "ratingCount": str(game['players'])
            },
            "operatingSystem": game.get('platform', 'Web')
        }, indent=2)

        soup.head.append(script_tag)

        with open(html_file + 'index.html', 'w', encoding='utf-8') as f:
            f.write(str(soup))
    except FileNotFoundError:
        print(f"{html_file} not found, skipping.")
