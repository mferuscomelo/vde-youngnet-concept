import type { Dict } from '.'

const de = {
  title: 'Meine Events',
  lead: 'Deine gemerkten Events. Gespeichert nur in diesem Browser – kein Konto nötig.',
  upcoming: 'Kommende Events',
  past: 'Vergangen',
  export: 'Als ICS exportieren',
  exportHint: 'Lädt alle kommenden gemerkten Events als Kalenderdatei herunter (Outlook, Apple, Google).',
  calName: 'Meine Young-Net-Events (Konzept)',
  emptyTitle: 'Noch nichts gemerkt',
  emptyText: 'Tippe bei einem Event auf „Merken“, dann erscheint es hier.',
  browse: 'Events entdecken',
}

const en: typeof de = {
  title: 'My events',
  lead: 'Your saved events. Stored in this browser only – no account needed.',
  upcoming: 'Upcoming events',
  past: 'Past',
  export: 'Export as ICS',
  exportHint: 'Downloads all upcoming saved events as a calendar file (Outlook, Apple, Google).',
  calName: 'My Young Net events (concept)',
  emptyTitle: 'Nothing saved yet',
  emptyText: 'Tap "Save" on an event and it will show up here.',
  browse: 'Discover events',
}

export const myevents: Dict<typeof de> = { de, en }
