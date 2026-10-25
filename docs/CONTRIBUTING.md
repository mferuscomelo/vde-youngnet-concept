# Mitmachen

Jede Änderung läuft über einen Pull Request (PR). Direkte Pushes auf `main` sind für alle gesperrt.

Kleine PRs sind willkommen: ein Tippfehler, ein kaputter Link, ein Vorschlag für einen Text.

## Ohne Programmierkenntnisse (im Browser)

1. Datei auf GitHub öffnen, z. B. einen Text in [`src/i18n/`](../src/i18n/).
2. Auf das Stift-Symbol (**Edit this file**) klicken.
3. Änderung machen, unten **Commit changes…** wählen.
4. GitHub legt automatisch einen Fork an und bietet **Create pull request** an.
5. Kurz beschreiben, *was* und *warum*, dann absenden.

## Mit Git (lokal)

```sh
# 1. Repo auf GitHub forken (Button "Fork"), dann:
git clone https://github.com/<dein-name>/vde-youngnet-concept.git
cd vde-youngnet-concept
git checkout -b fix/kurze-beschreibung

# 2. Ändern und prüfen
npm install
npm run dev      # ansehen unter http://localhost:5173/de
npm run build    # muss fehlerfrei durchlaufen

# 3. Hochladen
git commit -am "Kurz beschreiben, was sich ändert"
git push -u origin fix/kurze-beschreibung
```

Danach auf GitHub **Compare & pull request** klicken.

## Ein guter PR

- **Ein Thema** pro PR.
- **Beschreibung:** was ist das Problem, was ändert sich?
- **Screenshot**, wenn sich etwas sichtbar ändert.
- **Texte** gibt es auf Deutsch und Englisch – bitte beide anpassen (je eine Datei pro Bereich in `src/i18n/`).

## Nur eine Idee, kein Code?

Auch dann einen PR öffnen: zum Beispiel einen Absatz in [`docs/offene-punkte.md`](offene-punkte.md) ergänzen.
