import os

ICON_LINK = '<link rel="icon" href="/images/minefun-io-favicon.ico" type="image/x-icon">\n'

# Loop through all HTML files
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            # Check if link already exists
            if ICON_LINK.strip() in content:
                continue

            # Insert before </head>
            if "</head>" in content:
                content = content.replace("</head>", ICON_LINK + "</head>")

                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)

                print(f"Updated favicon in {file_path}")
