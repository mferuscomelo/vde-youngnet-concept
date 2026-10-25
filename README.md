# YoungNet Hub – Konzept-Prototyp

Klickbarer Prototyp für einen bundesweiten VDE-YoungNet-Event-Hub. **Keine offizielle VDE-Website.** Alle Daten sind illustrativ.

## Lokal starten

```sh
npm install
npm run dev        # http://localhost:5173/de
npm run build      # Typecheck + Produktions-Build nach dist/
```

`predev`/`prebuild` erzeugen die abonnierbaren ICS-Feeds in `public/ics/` aus `src/data/events.json`.
Mit `HUB_ORIGIN=https://<host> npm run build` enthalten die Feed-Einträge Links zurück auf die Event-Seiten.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `src/styles/tokens.css` | **Brand-Slot**: alle Farben, Schriften, Radien, Abstände. Neutral, bewusst kein VDE-Corporate-Design. |
| `src/components/Logo.tsx` | **Brand-Slot**: Text-Wortmarke „YoungNet Hub (Konzept)“. |
| `src/i18n/*.ts` | UI-Texte DE/EN, ein Namespace pro Bereich. |
| `src/data/events.json` | Events. Erzeugt von `scripts/seed-events.mjs` (Notion-Export 25.10.2026 + markierte Beispiel-Events). |
| `src/data/directory.ts` | Bezirksvereine, Hochschulgruppen, Ansprechpartner:innen, Fachgesellschaften – **nur Platzhalter**. |
| `src/lib/demoStore.tsx` | Demo-Zustand (Einreichungen, Freigaben, Merkliste) im `localStorage`, mit try/catch. „Demo zurücksetzen“ im Footer. |
| `src/lib/ics.js` | ICS-Erzeugung (Browser + Build-Skript). Ganztägige Termine, Outlook-kompatibel. |
| `functions/_middleware.js` | Passwortschutz (Basic Auth) für Cloudflare Pages. |

## Privat deployen (Cloudflare Pages)

1. Pages-Projekt anlegen, Build-Befehl `npm run build`, Output `dist`.
2. Umgebungsvariablen: `HUB_PASSWORD` (verschlüsselt), optional `HUB_USER` (Standard `youngnet`), optional `HUB_ORIGIN`.
3. Ohne `HUB_PASSWORD` liefert die Seite 503 – sie ist also nie versehentlich offen.

Zusätzlich gesetzt: `<meta name="robots" content="noindex, nofollow">`, `robots.txt` mit `Disallow: /`, `X-Robots-Tag`-Header.

## Offene TODOs (Daten)

- BV- und HSG-Liste, Ansprechpartner:innen, Mitgliedsbeiträge aus vde.com übernehmen (im UI als `TODO` markiert).
- Namen/Beschreibungen der Fachgesellschaften auf vde.com prüfen.
- Preise, Uhrzeiten und fehlende Orte der Notion-Events ergänzen.
- ICS-Import in Outlook (Desktop + Web) manuell testen.
