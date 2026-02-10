const fs = require("fs");
const path = require("path");

const baseUrl = "https://minefuniogame.github.io";

const gamesDir = path.join(__dirname, "game");

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// homepage
sitemap += `
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
  </url>`;

// games
fs.readdirSync(gamesDir, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .forEach(dir => {
    sitemap += `
  <url>
    <loc>${baseUrl}/game/${dir.name}/</loc>
    <priority>0.8</priority>
  </url>`;
  });

sitemap += `\n</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);
