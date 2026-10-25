# Deployment

## GitHub Pages (Standard)

Jeder Merge nach `main` baut und veröffentlicht die Seite über [`.github/workflows/pages.yml`](../.github/workflows/pages.yml).

- `BASE_PATH=/vde-youngnet-concept/` setzt den Unterpfad für Vite und den Router.
- `HUB_ORIGIN` sorgt dafür, dass ICS-Einträge auf die Event-Seiten verlinken.
- `404.html` ist eine Kopie von `index.html`, damit Direktlinks wie `/de/events` funktionieren.

Die Seite ist öffentlich, aber per `noindex` von Suchmaschinen ausgenommen.

## Cloudflare Pages mit Passwort (optional)

Für eine nicht öffentliche Vorschau:

1. Pages-Projekt anlegen: Build-Befehl `npm run build`, Output `dist`.
2. Umgebungsvariablen: `HUB_PASSWORD` (verschlüsselt), optional `HUB_USER` (Standard `youngnet`) und `HUB_ORIGIN`.
3. `functions/_middleware.js` schützt dann alles per Basic Auth. Ohne `HUB_PASSWORD` antwortet die Seite mit 503.
