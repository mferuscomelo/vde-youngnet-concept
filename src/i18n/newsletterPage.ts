import type { Dict } from '.'

const de = {
  title: 'Newsletter',
  lead: 'Statt jeder Rundmail an alle: ein Newsletter, der nur die Events enthält, die zu dir passen.',
  explainTitle: 'Was bedeuten Themen und Region?',
  topics: 'Themen: Wähle deine Zielgruppe (Studierende, Young Professionals) und was du suchst (Horizont erweitern, Networking, Onboarding). Du bekommst nur Events mit passenden Schlagworten – dieselben Filter wie auf der Event-Seite.',
  region: 'Region: Präsenz-Events aus deiner Region plus alle Online- und bundesweiten Events. Ohne Auswahl bekommst du alles.',
  freq: 'Rhythmus: einmal im Monat, abbestellen mit einem Klick.',
  alt: 'Lieber direkt im Kalender? Abonniere den Event-Kalender in Outlook oder Google.',
  altLink: 'Zum Kalender-Abo',
}

const en: typeof de = {
  title: 'Newsletter',
  lead: 'Instead of every mailing going to everyone: a newsletter with only the events that fit you.',
  explainTitle: 'What do topics and region mean?',
  topics: 'Topics: pick your audience (students, young professionals) and what you\'re looking for (broaden horizons, networking, onboarding). You only get events with matching tags – the same filters as on the events page.',
  region: 'Region: in-person events from your region plus all online and nationwide events. With no selection you get everything.',
  freq: 'Frequency: once a month, unsubscribe with one click.',
  alt: 'Prefer it in your calendar? Subscribe to the event calendar in Outlook or Google.',
  altLink: 'Go to calendar subscription',
}

export const newsletterPage: Dict<typeof de> = { de, en }
