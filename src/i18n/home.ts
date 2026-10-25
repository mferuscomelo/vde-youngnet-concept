import type { Dict } from '.'

const de = {
  title: 'Alle YoungNet-Events. Ein Ort.',
  lead: 'Finde in Sekunden, was zu dir passt – ob im Studium oder in den ersten Berufsjahren. Und veröffentliche dein eigenes Event in Minuten statt Wochen.',
  searchLabel: 'Events durchsuchen',
  searchPlaceholder: 'z. B. Workshop, Hamburg, KI …',
  search: 'Suchen',
  quick: 'Schnellfilter',
  chips: { students: 'Für Studierende', yp: 'Für Young Professionals', online: 'Online', near: 'In meiner Nähe' },
  next: 'Nächste Events',
  tiles: {
    events: ['Events finden', 'Liste, Kalender, Karte – mit Filtern für Zielgruppe, Region und Thema.'],
    hsg: ['Hochschulgruppe finden', 'Aktive Gruppen in deiner Nähe – oder eine ruhende wiederbeleben.'],
    organize: ['Event organisieren', 'Einreichen, Vorschau sehen, nach Freigabe sofort online.'],
  },
  facts: [
    ['2 Min.', 'statt ~1 Woche bis zur Veröffentlichung'],
    ['1 Ort', 'für Events aller BVs, HSGs und Fachgesellschaften'],
    ['2 Zielgruppen', 'klar getrennt: Studierende und Young Professionals'],
  ],
  firstSteps: 'Neu dabei? Die ersten 30 Tage',
  firstStepsLink: 'Zur Checkliste',
  entries: 'Einstiege',
  factsLabel: 'Was sich ändert',
}

const en: typeof de = {
  title: 'Every YoungNet event. One place.',
  lead: 'Find what fits you in seconds – whether you are studying or in your first working years. And publish your own event in minutes, not weeks.',
  searchLabel: 'Search events',
  searchPlaceholder: 'e.g. workshop, Hamburg, AI …',
  search: 'Search',
  quick: 'Quick filters',
  chips: { students: 'For students', yp: 'For young professionals', online: 'Online', near: 'Near me' },
  next: 'Upcoming events',
  tiles: {
    events: ['Find events', 'List, calendar, map – filter by audience, region and topic.'],
    hsg: ['Find a student group', 'Active groups near you – or revive a dormant one.'],
    organize: ['Organise an event', 'Submit, see a preview, live as soon as it is approved.'],
  },
  facts: [
    ['2 min', 'instead of ~1 week to publish'],
    ['1 place', 'for events from all districts, student groups and societies'],
    ['2 audiences', 'clearly separated: students and young professionals'],
  ],
  firstSteps: 'New here? Your first 30 days',
  firstStepsLink: 'Open the checklist',
  entries: 'Entry points',
  factsLabel: 'What changes',
}

export const homeT: Dict<typeof de> = { de, en }
