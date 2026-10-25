# Aufbau

Vite, React und TypeScript, ohne Backend. Leaflet mit OpenStreetMap für Karten. Zweisprachig (DE/EN).

## Befehle

```sh
npm run dev        # Entwicklungsserver
npm run build      # Typecheck + Build nach dist/
npm run typecheck  # nur Typecheck
```

`predev`/`prebuild` erzeugen die abonnierbaren ICS-Feeds in `public/ics/` aus `src/data/events.json`.

## Wo was liegt

| Pfad | Inhalt |
|---|---|
| `src/pages/` | Eine Datei pro Seite |
| `src/i18n/` | Alle Texte, DE und EN, ein Namespace pro Bereich |
| `src/data/events.json` | Events; erzeugt von `scripts/seed-events.mjs` |
| `src/data/directory.ts` | Bezirksvereine, Hochschulgruppen, Fachgesellschaften, Kontakte (nur Funktionen, keine Personennamen) |
| `src/styles/tokens.css` | Brand-Slot: Farben, Schriften, Abstände, gemessen an vde.com |
| `src/styles/base.css` | Komponenten im VDE-Stil |
| `src/components/` | Layout, Logo, Icons, Karte, Event-Bausteine |
| `src/lib/demoStore.tsx` | Demo-Zustand (Einreichungen, Merkliste) im `localStorage` |
| `src/lib/ics.js` | ICS-Erzeugung für Browser und Build |
| `public/brand/`, `public/images/` | VDE-Logos und Fotos von vde.com |

## Schrift

vde.com nutzt die lizenzierte Helvetica Neue. Der Prototyp nimmt sie, wo sie installiert ist, sonst Inter (selbst gehostet).
