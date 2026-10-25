import type { Dict } from '.'

const de = {
  title: 'Über das Konzept',
  lead: 'Ein Vorschlag aus dem Ehrenamt: ein bundesweiter Ort, an dem jedes YoungNet-Event in Sekunden auffindbar ist, Organisator:innen in Minuten veröffentlichen und jede Seite zur Mitgliedschaft führt.',
  whoTitle: 'Wer steckt dahinter?',
  who: 'Milan, Ehrenamtlicher bei VDE YoungNet in Karlsruhe, hat diesen Prototyp aus eigener Erfahrung als Event-Organisator gebaut. Er ist ein Diskussionsangebot – keine offizielle VDE-Website und nicht mit dem VDE abgestimmt.',
  problemsTitle: 'Welche Probleme wir sehen',
  problems: [
    ['Langsames Veröffentlichen', 'Ein Event zu listen heißt heute: E-Mail an die Geschäftsstelle, etwa eine Woche Wartezeit.'],
    ['Starre Branding-Regeln', 'Organisator:innen müssen Gestaltungsvorgaben von Hand umsetzen.'],
    ['Falsche Zielgruppe', 'Studierenden-Events landen bei Young Professionals und umgekehrt – beide Seiten haben wenig davon.'],
    ['Event-Seite schwer nutzbar', 'Keine Filter, keine Suche, keine Sortierung; vergangene und kommende Events gemischt.'],
    ['Zersplitterung', 'Jeder Bezirksverein hat eine eigene Website, Hochschulgruppen sind verstreut, viele haben nur ein bis zwei aktive Mitglieder.'],
    ['Folge', 'Mitglieder – besonders Young Professionals mit höherem Beitrag – sehen zu wenig Nutzen; Engagierte brennen an Bürokratie aus.'],
  ] as [string, string][],
  showsTitle: 'Was der Prototyp zeigt',
  shows: [
    ['Veröffentlichen in Minuten', '/einreichen', 'Event einreichen → Freigabe mit einem Klick → sofort sichtbar.'],
    ['Zielgruppen-Filter', '/events', 'Jedes Event ist klar für Studierende, Young Professionals oder alle markiert.'],
    ['Hochschulgruppen-Verzeichnis', '/hochschulgruppen', 'Kleine Gruppen sichtbar machen und ruhende wiederbeleben.'],
    ['Kalender-Abo für Outlook', '/events#abo', 'Alle oder gefilterte Events direkt im eigenen Kalender.'],
    ['Weg zur Mitgliedschaft', '/mitgliedschaft', 'Jede Event-Seite zeigt Mitgliederpreise und führt zum VDE.'],
  ] as [string, string, string][],
  dataTitle: 'Was ist echt, was ist illustrativ?',
  data: [
    'Die Event-Termine stammen aus einem internen Planungskalender (Stand 25. Oktober 2026). Beschreibungen dazu sind Beispieltexte.',
    'Events mit „Beispiel“ im Titel, Rückblicke, Jobs, Projekte und Statistiken sind erfunden und als Beispieldaten markiert.',
    'Bezirksvereine, Hochschulgruppen und Ansprechpersonen sind Platzhalter, bis echte Daten vorliegen.',
    'Formulare speichern nichts auf einem Server; Merkliste und Checkliste liegen nur in deinem Browser.',
  ],
  brandTitle: 'Platz für das offizielle Branding',
  brand: 'Der Prototyp nutzt bewusst ein neutrales Design ohne VDE-Logos oder Corporate Design. Alle Farben, Schriften und Abstände liegen in einer einzigen Datei (tokens.css), das Logo in einer einzigen Komponente. Übernimmt der VDE das Konzept, kann die Kommunikationsabteilung dort das offizielle Erscheinungsbild einsetzen – ohne den Rest anzufassen.',
  asksTitle: 'Nächste Schritte – Vorschlag',
  asks: [
    'Feedback zum Konzept von YoungNet-Team und Geschäftsstelle.',
    'Ein Pilot mit zwei bis drei Bezirksvereinen im Jahr 2027.',
    'Klärung, ob bei einer Übernahme das offizielle VDE-Branding verwendet werden darf.',
  ],
  start: 'Prototyp ausprobieren',
}

const en: typeof de = {
  title: 'About the concept',
  lead: 'A proposal from a volunteer: one nationwide place where every YoungNet event is findable in seconds, organisers publish in minutes, and every page leads towards membership.',
  whoTitle: 'Who is behind it?',
  who: 'Milan, a volunteer with VDE YoungNet in Karlsruhe, built this prototype from his own experience as an event organiser. It is an offer for discussion – not an official VDE website and not agreed with VDE.',
  problemsTitle: 'The problems we see',
  problems: [
    ['Slow publishing', 'Listing an event today means emailing head office and waiting about a week.'],
    ['Rigid branding rules', 'Organisers have to apply design guidelines by hand.'],
    ['Wrong audience', 'Student events reach young professionals and vice versa – neither side gets much from them.'],
    ['Hard-to-use event page', 'No filters, no search, no sorting; past and upcoming events mixed together.'],
    ['Fragmentation', 'Every district has its own website, student groups are scattered, many have only one or two active members.'],
    ['Result', 'Members – especially young professionals paying higher fees – see too little value; engaged volunteers burn out on red tape.'],
  ],
  showsTitle: 'What the prototype shows',
  shows: [
    ['Publishing in minutes', '/einreichen', 'Submit an event → one-click approval → visible immediately.'],
    ['Audience filter', '/events', 'Every event is clearly marked for students, young professionals or everyone.'],
    ['Student group directory', '/hochschulgruppen', 'Make small groups visible and revive dormant ones.'],
    ['Calendar feed for Outlook', '/events#abo', 'All or filtered events straight into your own calendar.'],
    ['Path to membership', '/mitgliedschaft', 'Every event page shows member prices and leads to VDE.'],
  ],
  dataTitle: 'What is real, what is illustrative?',
  data: [
    'Event dates come from an internal planning calendar (as of 25 October 2026). Their descriptions are sample text.',
    'Events with "Sample" in the title, recaps, jobs, projects and statistics are made up and marked as sample data.',
    'Districts, student groups and contact persons are placeholders until real data is available.',
    'Forms store nothing on a server; saved events and the checklist live only in your browser.',
  ],
  brandTitle: 'Room for the official branding',
  brand: 'The prototype deliberately uses a neutral design without VDE logos or corporate design. All colours, fonts and spacing live in a single file (tokens.css), the logo in a single component. If VDE adopts the concept, its communications team can drop in the official look there – without touching anything else.',
  asksTitle: 'Next steps – proposal',
  asks: [
    'Feedback on the concept from the YoungNet team and head office.',
    'A pilot with two or three districts in 2027.',
    'Clarify whether the official VDE branding may be used if the concept is adopted.',
  ],
  start: 'Try the prototype',
}

export const concept: Dict<typeof de> = { de, en }
