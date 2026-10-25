import type { Dict } from '.'
import { asset } from '../lib/asset'

// Welcome, mission and audience texts follow vde.com/de/vde-youngnet (October 2026);
// the figures are from vde.com (students, student groups) and src/data/directory.ts.

const de = {
  kicker: 'Das junge Netzwerk im VDE',
  title: 'Herzlich willkommen im VDE Young Net!',
  subline: 'Vernetzen. Gestalten. Durchstarten.',
  lead: 'Wir bringen Studierende und Young Professionals der Elektro- und Informationstechnik aus ganz Deutschland zusammen – in Hochschulgruppen, Bezirksvereinen und den jungen Netzwerken der Fachgesellschaften.',
  ctaEvents: 'Events entdecken',
  ctaJoin: 'Mitglied werden',
  heroAlt: 'Gruppenfoto beim VDE Hochschulgruppen Get Together 2025 mit VDE-Fahne',

  goalsTitle: 'Unsere zwei Ziele',
  goals: [
    {
      title: 'Netzwerk bilden',
      text: 'Lerne andere Studierende und Young Professionals kennen – und erfahrene Fach- und Führungskräfte, die ihre Kontakte gern teilen. Am Stammtisch, beim Kaminabend, beim Hochschulgruppen-Treffen. Aus Kontakten werden Lerngruppen, Mentor:innen und Jobchancen.',
      link: 'Hochschulgruppe finden',
      to: '/hochschulgruppen',
      img: asset('images/vde/kaminabend-1.jpg'),
      alt: 'Junge VDE-Mitglieder im Gespräch an langen Tischen beim Kaminabend 2025',
    },
    {
      title: 'Horizonte erweitern',
      text: 'Schau über dein Fach und deinen Hörsaal hinaus: Exkursionen zu Unternehmen, Junge Foren auf den VDE-Kongressen, Soft-Skill-Seminare und Fachvorträge – von Energietechnik über KI bis Medizintechnik.',
      link: 'Events entdecken',
      to: '/events',
      img: asset('images/vde/fg-netzwerke.jpg'),
      alt: 'Rednerin beim Jungen Forum BMT, dem Forum für Nachwuchskräfte der Medizintechnik',
    },
  ],

  aboutTitle: 'Technik verbindet. Wir auch.',
  about: [
    'Das VDE Young Net ist das junge Netzwerk im VDE e.V. und die Community der nächsten Generation e-technischer Fach- und Führungskräfte. Hier vernetzt du dich, tauschst Erfahrungen aus und knüpfst Kontakte – im Studium und beim Berufseinstieg.',
    'In den Hochschulgruppen und Young-Professionals-Netzwerken – vor Ort oder fachlich bundesweit – engagieren sich Studierende und Young Professionals selbst. Je nach Tradition und Interesse organisieren sie ein buntes Programm: vom Stammtisch über Exkursionen und Lerngruppen bis zum Soft-Skill-Seminar.',
  ],
  factsLabel: 'Das VDE Young Net in Zahlen',
  facts: [
    ['8.000', 'Studierende im VDE vernetzt'],
    ['60+', 'Hochschulgruppen bundesweit'],
    ['28', 'Bezirksvereine vor Ort'],
    ['5', 'Fachgesellschaften mit jungen Netzwerken'],
  ],

  audTitle: 'Was passt zu dir?',
  audiences: [
    { key: 'studierende', title: 'Studierende', text: 'Hochschulgruppe, Lerngruppen, Exkursionen und das Hochschulgruppen Get Together.', img: asset('images/vde/hsgt-2024.jpg'), alt: 'Zwei Studierende mit „We love VDE“-Schild und Tiger-Maskottchen' },
    { key: 'young-professionals', title: 'Young Professionals', text: 'Von Young Pros für Young Pros: Kaminabende, After Work, Junge Foren und Karrierethemen.', img: asset('images/vde/etg-junges-forum.jpg'), alt: 'Young Professionals im Gespräch beim Jungen Forum ETG' },
    { key: 'schueler-azubis', title: 'Schüler:innen & Azubis', text: 'Erste Einblicke in die Elektrotechnik – etwa beim Schülerwettbewerb INVENT a CHIP.', img: asset('images/vde/schueler.jpg'), alt: 'Jugendliche arbeiten gemeinsam an Laptops und Tablets' },
  ],

  next: 'Nächste Events',
  searchLabel: 'Events durchsuchen',
  searchPlaceholder: 'z. B. Workshop, Hamburg, KI …',
  search: 'Suchen',

  whereTitle: 'Wo du mitmachst',
  where: [
    ['Hochschulgruppen', 'Über 60 Gruppen an Hochschulen in ganz Deutschland – finde deine oder gründe eine neue.', '/hochschulgruppen'],
    ['Fachgesellschaften', 'Junge Netzwerke in ETG, ITG, GMM und DGBMT: bundesweit, fachlich, mit eigenen Foren.', '/fachgesellschaften'],
    ['Bezirksvereine', '28 Bezirksvereine bringen dich vor Ort mit der Branche zusammen.', '/bezirksvereine'],
  ],

  galleryTitle: 'Eindrücke aus dem Netzwerk',
  gallery: [
    [asset('images/vde/itg-gemic.jpg'), 'Junges Forum ITG zur GeMiC 2026', 'https://www.vde.com/de/vde-youngnet/aktuelles/junges-forum-itg-gemic-2026'],
    [asset('images/vde/hero-bmt.jpg'), 'Junges Forum BMT 2025', 'https://www.vde.com/de/vde-youngnet/aktuelles/junges-forum-bmt-2025-nachbericht'],
    [asset('images/vde/bbb-festival.jpg'), '3B-Festival der Elektronik', 'https://www.instagram.com/vdeyoungnet/'],
    [asset('images/vde/kaminabend-simon.jpg'), 'Kaminabend der Young Professionals', 'https://www.vde.com/de/vde-youngnet/aktuelles/kaminabend-der-young-pros-in-essen'],
  ],
  photoCredit: 'Fotos: VDE / vde.com',

  socialLead: 'Rückblicke, Termine und Geschichten aus den Gruppen – direkt aus der Community.',

  firstSteps: 'Neu dabei? Die ersten 30 Tage',
  firstStepsLink: 'Zur Checkliste',
  firstStepsText: 'Eine Checkliste für deinen Einstieg: erstes Event, deine Hochschulgruppe, das richtige Netzwerk.',
}

const en: typeof de = {
  kicker: 'The young network within VDE',
  title: 'Welcome to VDE Young Net!',
  subline: 'Connect. Shape. Take off.',
  lead: 'We bring together students and young professionals in electrical engineering and information technology from all over Germany – in student groups, district associations and the young networks of the technical societies.',
  ctaEvents: 'Discover events',
  ctaJoin: 'Become a member',
  heroAlt: 'Group photo at the VDE student group get-together 2025 with a VDE banner',

  goalsTitle: 'Our two goals',
  goals: [
    {
      title: 'Build your network',
      text: 'Meet other students and young professionals – and experienced engineers and managers who are happy to share their contacts. At a regulars’ table, a fireside evening, a student group meet-up. Contacts turn into study groups, mentors and job opportunities.',
      link: 'Find a student group',
      to: '/hochschulgruppen',
      img: asset('images/vde/kaminabend-1.jpg'),
      alt: 'Young VDE members talking at long tables during the 2025 fireside evening',
    },
    {
      title: 'Broaden your horizons',
      text: 'Look beyond your subject and your lecture hall: company excursions, Young Forums at VDE congresses, soft-skill seminars and technical talks – from power engineering to AI to medical technology.',
      link: 'Discover events',
      to: '/events',
      img: asset('images/vde/fg-netzwerke.jpg'),
      alt: 'Speaker at the BMT Young Forum for early-career medical engineers',
    },
  ],

  aboutTitle: 'Technology connects. So do we.',
  about: [
    'VDE Young Net is the young network within VDE e.V. and the community of the next generation of engineers and leaders in electrical engineering. This is where you connect, share experience and make contacts – while studying and when starting your career.',
    'In the student groups and young professional networks – local or nationwide by subject – students and young professionals run things themselves. Depending on tradition and interest they organise a varied programme: from regulars’ tables to excursions and study groups to soft-skill seminars.',
  ],
  factsLabel: 'VDE Young Net in numbers',
  facts: [
    ['8,000', 'students connected in VDE'],
    ['60+', 'student groups nationwide'],
    ['28', 'local district associations'],
    ['5', 'technical societies with young networks'],
  ],

  audTitle: 'What fits you?',
  audiences: [
    { key: 'studierende', title: 'Students', text: 'Student groups, study groups, excursions and the student group get-together.', img: asset('images/vde/hsgt-2024.jpg'), alt: 'Two students holding a “We love VDE” sign next to a tiger mascot' },
    { key: 'young-professionals', title: 'Young professionals', text: 'By young pros, for young pros: fireside evenings, after-work meet-ups, Young Forums and career topics.', img: asset('images/vde/etg-junges-forum.jpg'), alt: 'Young professionals talking at the ETG Young Forum' },
    { key: 'schueler-azubis', title: 'Pupils & apprentices', text: 'A first look at electrical engineering – for example in the INVENT a CHIP school competition.', img: asset('images/vde/schueler.jpg'), alt: 'Teenagers working together on laptops and tablets' },
  ],

  next: 'Upcoming events',
  searchLabel: 'Search events',
  searchPlaceholder: 'e.g. workshop, Hamburg, AI …',
  search: 'Search',

  whereTitle: 'Where you get involved',
  where: [
    ['Student groups', 'More than 60 groups at universities across Germany – find yours or start a new one.', '/hochschulgruppen'],
    ['Technical societies', 'Young networks in ETG, ITG, GMM and DGBMT: nationwide, by subject, with their own forums.', '/fachgesellschaften'],
    ['Districts', '28 district associations connect you with the industry locally.', '/bezirksvereine'],
  ],

  galleryTitle: 'Impressions from the network',
  gallery: [
    [asset('images/vde/itg-gemic.jpg'), 'ITG Young Forum at GeMiC 2026', 'https://www.vde.com/de/vde-youngnet/aktuelles/junges-forum-itg-gemic-2026'],
    [asset('images/vde/hero-bmt.jpg'), 'BMT Young Forum 2025', 'https://www.vde.com/de/vde-youngnet/aktuelles/junges-forum-bmt-2025-nachbericht'],
    [asset('images/vde/bbb-festival.jpg'), '3B Festival of Electronics', 'https://www.instagram.com/vdeyoungnet/'],
    [asset('images/vde/kaminabend-simon.jpg'), 'Young professionals’ fireside evening', 'https://www.vde.com/de/vde-youngnet/aktuelles/kaminabend-der-young-pros-in-essen'],
  ],
  photoCredit: 'Photos: VDE / vde.com',

  socialLead: 'Recaps, dates and stories from the groups – straight from the community.',

  firstSteps: 'New here? Your first 30 days',
  firstStepsLink: 'Open the checklist',
  firstStepsText: 'A checklist to get you started: your first event, your student group, the right network.',
}

export const homeT: Dict<typeof de> = { de, en }
