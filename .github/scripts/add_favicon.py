import os
import re

# --- CONFIG ---
ICON_LINK = '<link rel="icon" href="/images/minefun-io-favicon.ico" type="image/x-icon">\n'

# Root folder dyal HTML files (GitHub Pages)
ROOT_DIR = "."

# Loop through all HTML files
for root, dirs, files in os.walk(ROOT_DIR):
    for file in files:
        if file.endswith(".html"):
            file_path = os.path.join(root, file)
            
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            # Skip if ICON_LINK already exists
            if ICON_LINK.strip() in content:
                continue

            # Case-insensitive replace </head>
            if re.search(r'</head>', content, re.IGNORECASE):
                content = re.sub(r'</head>', ICON_LINK + '</head>', content, flags=re.IGNORECASE)
            else:
                # If </head> missing, create head section
                if "<head>" not in content:
                    content = content.replace("<html>", "<html>\n<head>\n" + ICON_LINK + "</head>\n")
                else:
                    # If <head> exists but no </head>
                    content = content.replace("<head>", "<head>\n" + ICON_LINK)

            # Save file
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)

            print(f"✅ Favicon inserted in {file_path}")
