import type { Dict } from '.'
import { asset } from '../lib/asset'

// Audience pages behind the "Für dich" menu. Texts follow vde.com: the student networks page
// (8,000 students, 60+ groups), "VDE Young Professionals" and the Young Net welcome text on
// school programmes; INVENT a CHIP from the VDE press release of 06.10.2026.

export const GROUPS = ['studierende', 'young-professionals', 'schueler-azubis'] as const
export type Group = (typeof GROUPS)[number]

type Page = {
  tab: string
  title: string
  lead: string
  img: string
  alt: string
  offersTitle: string
  offers: [string, string][]
  links: [string, string][] // [label, path or URL]
  eventsTitle: string
  note?: string
}

const de: { tabsLabel: string; noEvents: string; linksTitle: string } & Record<Group, Page> = {
  tabsLabel: 'Zielgruppen',
  noEvents: 'Gerade keine passenden Termine – schau bald wieder rein.',
  linksTitle: 'Weiter geht’s',
  studierende: {
    tab: 'Studierende',
    title: 'Für Studierende',
    lead: 'Beim VDE sind rund 8.000 Studierende in über 60 Hochschulgruppen vernetzt. Werde auch du Teil der E-Technik-Community!',
    img: asset('images/vde/hsgt-2025.jpg'),
    alt: 'Gruppenfoto beim VDE Hochschulgruppen Get Together 2025',
    offersTitle: 'Was dich erwartet',
    offers: [
      ['Deine Hochschulgruppe', 'Stammtische, Exkursionen, Lerngruppen und Soft-Skill-Seminare – organisiert von Studierenden für Studierende.'],
      ['Hochschulgruppen Get Together', 'Einmal im Jahr treffen sich die Gruppen aus ganz Deutschland – 2026 vom 6. bis 8. November in Zwickau.'],
      ['Junge Netzwerke der Fachgesellschaften', 'Fachlich und bundesweit: die Jungen Foren von ETG, ITG und DGBMT sowie die Junge GMM.'],
      ['Praktika & Abschlussarbeiten', 'Kontakte in die Branche, lange bevor du dich bewirbst.'],
    ],
    links: [
      ['Hochschulgruppe finden', '/hochschulgruppen'],
      ['Events für Studierende', '/events?aud=students'],
      ['Praktika, Abschlussarbeiten & Jobs', '/jobs'],
      ['Mitgliedschaft für Studierende', '/mitgliedschaft'],
    ],
    eventsTitle: 'Nächste Events für Studierende',
  },
  'young-professionals': {
    tab: 'Young Professionals',
    title: 'Für Young Professionals',
    lead: 'Der VDE bietet Young Professionals ein starkes Netzwerk für den Einstieg ins Berufsleben, fachlichen Austausch und persönliche Weiterbildung. Von Young Pros für Young Pros.',
    img: asset('images/vde/kaminabend-2.jpg'),
    alt: 'Young Professionals beim Abendessen auf dem VDE Kaminabend 2025',
    offersTitle: 'Gute Gründe für ein Engagement',
    offers: [
      ['Ein Booster für deine Karriere', 'Du lernst Führung, ohne gleich Teamleiter:in zu sein, wirst sichtbar und kommst günstig – im Kernteam oft kostenfrei – zu Kongressen und Weiterbildungen.'],
      ['Menschen, die dich weiterbringen', 'Berufseinsteiger:innen mit ähnlichen Fragen, Expert:innen, Mentor:innen und potenzielle Arbeitgeber.'],
      ['Eigene Impulse setzen', 'Ob Nachhaltigkeit, KI oder Diversität: Du bestimmst mit, welche Themen gespielt werden – mit eigenen Events und Formaten.'],
      ['Freiwillig und flexibel', 'Du bestimmst selbst, wie aktiv du sein willst. Reinschnuppern geht jederzeit.'],
    ],
    links: [
      ['Events für Young Professionals', '/events?aud=young-professionals'],
      ['Bezirksverein in deiner Nähe', '/bezirksvereine'],
      ['Mentoring / Buddy-Programm', '/mentoring'],
      ['Mitgliedschaft für Berufseinsteiger:innen', '/mitgliedschaft'],
    ],
    eventsTitle: 'Nächste Events für Young Professionals',
  },
  'schueler-azubis': {
    tab: 'Schüler:innen & Azubis',
    title: 'Für Schüler:innen & Azubis',
    lead: 'Der VDE organisiert Programme und Events für Schülerinnen und Schüler, um früh Interesse an der Elektrotechnik zu wecken – und einen ersten Einblick in eine faszinierende Welt zu geben.',
    img: asset('images/vde/iac.jpg'),
    alt: 'Preisträger:innen von INVENT a CHIP 2026 beim Gruppenfoto',
    offersTitle: 'Was du machen kannst',
    offers: [
      ['INVENT a CHIP', 'Der bundesweite Schülerwettbewerb von BMFTR und VDE für die Klassen 9 bis 13: Du entwickelst selbst einen Mikrochip – seit 25 Jahren.'],
      ['Offene Events', 'Viele Vorträge und Exkursionen stehen allen offen. Schau vorbei und lerne Studierende und Young Professionals kennen.'],
      ['Hochschulgruppen kennenlernen', 'Du überlegst, E-Technik zu studieren? Die Hochschulgruppen erzählen dir, wie das Studium wirklich ist.'],
    ],
    links: [
      ['INVENT a CHIP', 'https://www.invent-a-chip.de/'],
      ['Offene Events', '/events'],
      ['Hochschulgruppen', '/hochschulgruppen'],
    ],
    eventsTitle: 'Offene Events',
    note: 'Ein eigenes Angebot für Auszubildende ist auf vde.com derzeit nicht ausgeschrieben. Dieser Bereich ist ein Vorschlag des Prototyps.',
  },
}

const en: typeof de = {
  tabsLabel: 'Audiences',
  noEvents: 'No matching dates right now – check back soon.',
  linksTitle: 'Where next',
  studierende: {
    tab: 'Students',
    title: 'For students',
    lead: 'Around 8,000 students are connected in more than 60 VDE student groups. Become part of the electrical engineering community too!',
    img: asset('images/vde/hsgt-2025.jpg'),
    alt: 'Group photo at the VDE student group get-together 2025',
    offersTitle: 'What to expect',
    offers: [
      ['Your student group', 'Regulars’ tables, excursions, study groups and soft-skill seminars – organised by students for students.'],
      ['Student group get-together', 'Once a year, groups from all over Germany meet – in 2026 from 6 to 8 November in Zwickau.'],
      ['Young networks of the technical societies', 'By subject and nationwide: the Young Forums of ETG, ITG and DGBMT and Young GMM.'],
      ['Internships & theses', 'Contacts in the industry long before you apply.'],
    ],
    links: [
      ['Find a student group', '/hochschulgruppen'],
      ['Events for students', '/events?aud=students'],
      ['Internships, theses & jobs', '/jobs'],
      ['Student membership', '/mitgliedschaft'],
    ],
    eventsTitle: 'Upcoming events for students',
  },
  'young-professionals': {
    tab: 'Young professionals',
    title: 'For young professionals',
    lead: 'VDE offers young professionals a strong network for starting their career, exchanging expertise and developing personally. By young pros, for young pros.',
    img: asset('images/vde/kaminabend-2.jpg'),
    alt: 'Young professionals at dinner during the VDE fireside evening 2025',
    offersTitle: 'Good reasons to get involved',
    offers: [
      ['A boost for your career', 'You learn leadership without being a team lead yet, become visible and get to congresses and training at low cost – often free as part of the core team.'],
      ['People who move you forward', 'Career starters with similar questions, experts, mentors and potential employers.'],
      ['Set your own agenda', 'Sustainability, AI or diversity: you help decide which topics matter – with your own events and formats.'],
      ['Voluntary and flexible', 'You decide how active you want to be. Dropping in is always possible.'],
    ],
    links: [
      ['Events for young professionals', '/events?aud=young-professionals'],
      ['District association near you', '/bezirksvereine'],
      ['Mentoring / buddy programme', '/mentoring'],
      ['Membership for career starters', '/mitgliedschaft'],
    ],
    eventsTitle: 'Upcoming events for young professionals',
  },
  'schueler-azubis': {
    tab: 'Pupils & apprentices',
    title: 'For pupils & apprentices',
    lead: 'VDE runs programmes and events for school pupils to spark an early interest in electrical engineering – and give a first look into a fascinating field.',
    img: asset('images/vde/iac.jpg'),
    alt: 'INVENT a CHIP 2026 prize winners in a group photo',
    offersTitle: 'What you can do',
    offers: [
      ['INVENT a CHIP', 'The nationwide school competition by BMFTR and VDE for years 9 to 13: you design your own microchip – for 25 years now.'],
      ['Open events', 'Many talks and excursions are open to everyone. Drop by and meet students and young professionals.'],
      ['Meet the student groups', 'Thinking about studying electrical engineering? The student groups will tell you what it is really like.'],
    ],
    links: [
      ['INVENT a CHIP', 'https://www.invent-a-chip.de/'],
      ['Open events', '/events'],
      ['Student groups', '/hochschulgruppen'],
    ],
    eventsTitle: 'Open events',
    note: 'vde.com does not currently advertise a dedicated offer for apprentices. This section is a proposal of the prototype.',
  },
}

export const audienceT: Dict<typeof de> = { de, en }
