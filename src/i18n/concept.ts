import type { Dict } from '.'

const de = {
  title: 'Über das Konzept',
  lead: 'Ein Vorschlag aus dem Ehrenamt: ein bundesweiter Ort, an dem jedes Young-Net-Event in Sekunden auffindbar ist, Organisator:innen in Minuten veröffentlichen und jede Seite zur Mitgliedschaft führt.',
  whoTitle: 'Wer steckt dahinter?',
  who: 'Milan, Ehrenamtlicher bei VDE Young Net in Karlsruhe, hat diesen Prototyp aus eigener Erfahrung als Event-Organisator gebaut. Er ist ein Diskussionsangebot – keine offizielle VDE-Website und nicht mit dem VDE abgestimmt.',
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
    ['Veröffentlichen in Minuten', '/einreichen', 'Event einreichen, mit einem Klick freigeben, sofort sichtbar.'],
    ['Zielgruppen-Filter', '/events', 'Jedes Event ist klar für Studierende, Young Professionals oder alle markiert.'],
    ['Hochschulgruppen-Verzeichnis', '/hochschulgruppen', 'Kleine Gruppen sichtbar machen und ruhende wiederbeleben.'],
    ['Kalender-Abo für Outlook', '/events#abo', 'Alle oder gefilterte Events direkt im eigenen Kalender.'],
    ['Weg zur Mitgliedschaft', '/mitgliedschaft', 'Jede Event-Seite zeigt Mitgliederpreise und führt zum VDE.'],
  ] as [string, string, string][],
  dataTitle: 'Woher die Inhalte stammen',
  data: [
    'Die Young-Professional-Termine und ihre Beschreibungen stammen aus dem Young-Net-Planungskalender (Stand 25. Oktober 2026).',
    'Bezirksvereine, Hochschulgruppen, Fachgesellschaften und Mitgliedsbeiträge sind von vde.com übernommen.',
    'Hochschulgruppen-Events, Rückblicke, Stellen, Projekte und Statistiken sind zur Veranschaulichung ergänzt.',
    'Formulare speichern nichts auf einem Server; Merkliste und Checkliste liegen nur in deinem Browser.',
  ],
  brandTitle: 'VDE-Erscheinungsbild',
  brand: 'Der Prototyp übernimmt das Erscheinungsbild von vde.com/youngnet: VDE-Logo und Young-Net-Wortmarke, Farben, Schriftschnitte, Navigation, Teaser, Buttons und Formulare. Alle Werte stammen aus den Stylesheets der VDE-Website und liegen in einer einzigen Datei (tokens.css). Wo dort Helvetica Neue nicht installiert ist, springt Inter ein, weil die lizenzierte VDE-Webschrift nicht verwendet werden darf.',
  asksTitle: 'Nächste Schritte – Vorschlag',
  asks: [
    'Feedback zum Konzept von Young-Net-Team und Geschäftsstelle.',
    'Ein Pilot mit zwei bis drei Bezirksvereinen im Jahr 2027.',
    'Klärung, ob bei einer Übernahme das offizielle VDE-Branding verwendet werden darf.',
  ],
  start: 'Prototyp ausprobieren',
}

const en: typeof de = {
  title: 'About the concept',
  lead: 'A proposal from a volunteer: one nationwide place where every Young Net event is findable in seconds, organisers publish in minutes, and every page leads towards membership.',
  whoTitle: 'Who is behind it?',
  who: 'Milan, a volunteer with VDE Young Net in Karlsruhe, built this prototype from his own experience as an event organiser. It is an offer for discussion – not an official VDE website and not agreed with VDE.',
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
    ['Publishing in minutes', '/einreichen', 'Submit an event, approve it in one click, visible immediately.'],
    ['Audience filter', '/events', 'Every event is clearly marked for students, young professionals or everyone.'],
    ['Student group directory', '/hochschulgruppen', 'Make small groups visible and revive dormant ones.'],
    ['Calendar feed for Outlook', '/events#abo', 'All or filtered events straight into your own calendar.'],
    ['Path to membership', '/mitgliedschaft', 'Every event page shows member prices and leads to VDE.'],
  ],
  dataTitle: 'Where the content comes from',
  data: [
    'Young-professional dates and their descriptions come from the Young Net planning calendar (as of 25 October 2026).',
    'District associations, student groups, technical societies and membership fees are taken from vde.com.',
    'Student-group events, recaps, job listings, projects and statistics have been added for illustration.',
    'Forms store nothing on a server; saved events and the checklist live only in your browser.',
  ],
  brandTitle: 'VDE look and feel',
  brand: 'The prototype adopts the look of vde.com/youngnet: VDE logo and Young Net wordmark, colours, type weights, navigation, teasers, buttons and forms. All values come from the VDE website stylesheets and live in a single file (tokens.css). Where Helvetica Neue is not installed, Inter stands in, because the licensed VDE webfont may not be reused.',
  asksTitle: 'Next steps – proposal',
  asks: [
    'Feedback on the concept from the Young Net team and head office.',
    'A pilot with two or three districts in 2027.',
    'Clarify whether the official VDE branding may be used if the concept is adopted.',
  ],
  start: 'Try the prototype',
}

export const concept: Dict<typeof de> = { de, en }
