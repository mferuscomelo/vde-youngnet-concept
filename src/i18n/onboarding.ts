import type { Dict } from '.'

type Item = { id: string; day: string; title: string; text: string; to: string; link: string }

const de = {
  title: 'Erste Schritte',
  lead: 'Neu dabei? Diese Checkliste bringt dich in 30 Tagen ins Netzwerk. Dein Fortschritt wird nur in deinem Browser gespeichert.',
  trackLabel: 'Wähle deinen Weg',
  students: 'Studierende',
  yp: 'Young Professionals',
  progress: '{done} von {total} erledigt',
  doneAll: 'Geschafft! Du bist angekommen.',
  reset: 'Fortschritt zurücksetzen',
  tracks: {
    students: [
      { id: 's-hsg', day: 'Tag 1', title: 'Hochschulgruppe finden', text: 'Schau, ob es an deiner Hochschule eine aktive Gruppe gibt.', to: '/hochschulgruppen', link: 'Zum Verzeichnis' },
      { id: 's-stammtisch', day: 'Woche 1', title: 'Zu einem Stammtisch gehen', text: 'Der einfachste Einstieg: einfach vorbeikommen.', to: '/events?type=stammtisch&aud=students', link: 'Stammtische für Studierende' },
      { id: 's-cal', day: 'Woche 1', title: 'Kalender abonnieren', text: 'Alle passenden Events direkt in Outlook oder auf dem Handy.', to: '/events#abo', link: 'Kalender-Abo' },
      { id: 's-bv', day: 'Woche 2', title: 'Deinen Bezirksverein kennenlernen', text: 'Der BV organisiert Exkursionen und Vorträge in deiner Region.', to: '/bezirksvereine', link: 'Bezirksvereine' },
      { id: 's-fg', day: 'Woche 2', title: 'Eine Fachgesellschaft auswählen', text: 'Energie, Information, Mikroelektronik, Automatisierung oder Medizintechnik?', to: '/fachgesellschaften', link: 'Fachgesellschaften' },
      { id: 's-news', day: 'Woche 3', title: 'Newsletter abonnieren', text: 'Einmal im Monat die Events, die zu dir passen.', to: '/newsletter', link: 'Zum Newsletter' },
      { id: 's-mentor', day: 'Woche 4', title: 'Mentor:in finden', text: 'Ein Young Professional beantwortet deine Fragen zu Praktikum und Berufseinstieg.', to: '/mentoring', link: 'Mentoring' },
    ],
    yp: [
      { id: 'y-stammtisch', day: 'Tag 1', title: 'Zum YP-Stammtisch anmelden', text: 'Online, locker, regelmäßig – perfekt zum Ankommen.', to: '/events?type=stammtisch&aud=young-professionals', link: 'YP-Stammtische' },
      { id: 'y-cal', day: 'Woche 1', title: 'Kalender abonnieren', text: 'Nur YP-Events, direkt in deinem Outlook.', to: '/events#abo', link: 'Kalender-Abo' },
      { id: 'y-bv', day: 'Woche 1', title: 'Deinen Bezirksverein finden', text: 'Regionale Events nach Feierabend in deiner Nähe.', to: '/bezirksvereine', link: 'Bezirksvereine' },
      { id: 'y-fg', day: 'Woche 2', title: 'Eine Fachgesellschaft auswählen', text: 'Fachliches Netzwerk und Junge Foren in deinem Bereich.', to: '/fachgesellschaften', link: 'Fachgesellschaften' },
      { id: 'y-news', day: 'Woche 2', title: 'Newsletter abonnieren', text: 'Themen und Region selbst wählen.', to: '/newsletter', link: 'Zum Newsletter' },
      { id: 'y-mentor', day: 'Woche 3', title: 'Mentoring: geben oder nehmen', text: 'Studierende begleiten oder selbst von erfahrenen Mitgliedern lernen.', to: '/mentoring', link: 'Mentoring' },
      { id: 'y-hsg', day: 'Woche 4', title: 'Eine Hochschulgruppe unterstützen', text: 'Viele Gruppen suchen Leute mit Berufserfahrung für Vorträge.', to: '/hochschulgruppen', link: 'Hochschulgruppen' },
    ],
  } as { students: Item[]; yp: Item[] },
}

const en: typeof de = {
  title: 'First steps',
  lead: 'New here? This checklist gets you into the network within 30 days. Your progress is only stored in your browser.',
  trackLabel: 'Choose your track',
  students: 'Students',
  yp: 'Young professionals',
  progress: '{done} of {total} done',
  doneAll: 'Done! You have arrived.',
  reset: 'Reset progress',
  tracks: {
    students: [
      { id: 's-hsg', day: 'Day 1', title: 'Find a student group', text: 'Check whether your university has an active group.', to: '/hochschulgruppen', link: 'To the directory' },
      { id: 's-stammtisch', day: 'Week 1', title: 'Go to a meetup', text: 'The easiest way in: just show up.', to: '/events?type=stammtisch&aud=students', link: 'Meetups for students' },
      { id: 's-cal', day: 'Week 1', title: 'Subscribe to the calendar', text: 'All relevant events straight into Outlook or your phone.', to: '/events#abo', link: 'Calendar feed' },
      { id: 's-bv', day: 'Week 2', title: 'Get to know your district', text: 'Your district runs excursions and talks in your region.', to: '/bezirksvereine', link: 'Districts' },
      { id: 's-fg', day: 'Week 2', title: 'Pick a technical society', text: 'Energy, information, microelectronics, automation or medical technology?', to: '/fachgesellschaften', link: 'Technical societies' },
      { id: 's-news', day: 'Week 3', title: 'Sign up for the newsletter', text: 'Once a month, the events that fit you.', to: '/newsletter', link: 'Newsletter' },
      { id: 's-mentor', day: 'Week 4', title: 'Find a mentor', text: 'A young professional answers your questions about internships and starting work.', to: '/mentoring', link: 'Mentoring' },
    ],
    yp: [
      { id: 'y-stammtisch', day: 'Day 1', title: 'Sign up for the YP meetup', text: 'Online, casual, regular – perfect for settling in.', to: '/events?type=stammtisch&aud=young-professionals', link: 'YP meetups' },
      { id: 'y-cal', day: 'Week 1', title: 'Subscribe to the calendar', text: 'Only YP events, straight into your Outlook.', to: '/events#abo', link: 'Calendar feed' },
      { id: 'y-bv', day: 'Week 1', title: 'Find your district', text: 'Regional after-work events near you.', to: '/bezirksvereine', link: 'Districts' },
      { id: 'y-fg', day: 'Week 2', title: 'Pick a technical society', text: 'A professional network and young forums in your field.', to: '/fachgesellschaften', link: 'Technical societies' },
      { id: 'y-news', day: 'Week 2', title: 'Sign up for the newsletter', text: 'Choose your own topics and region.', to: '/newsletter', link: 'Newsletter' },
      { id: 'y-mentor', day: 'Week 3', title: 'Mentoring: give or receive', text: 'Support students or learn from experienced members yourself.', to: '/mentoring', link: 'Mentoring' },
      { id: 'y-hsg', day: 'Week 4', title: 'Support a student group', text: 'Many groups look for people with work experience to give talks.', to: '/hochschulgruppen', link: 'Student groups' },
    ],
  },
}

export const onboarding: Dict<typeof de> = { de, en }
