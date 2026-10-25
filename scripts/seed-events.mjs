// Generator for src/data/events.json. Young-professional events come from the Notion
// database "Events 2027 – Öffentlich" (25 Oct 2026, German text verbatim); the student-group
// and regional events below complete the calendar.
import { writeFileSync } from 'node:fs'

const slugify = (s) => s.toLowerCase()
  .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Free member tickets for trade fairs and congresses (limited contingent)
const TICKETS = 'https://www.vde.com/de/vde-youngnet/aktivitaeten-/freikarten-messe'

const YP = 'Lockerer Stammtisch der VDE Young Net Young Professionals. Lerne andere junge Ingenieur:innen kennen, erfahre, was bei Young Net läuft, und finde heraus, wie du selbst Events mitgestalten kannst. Neue Gesichter sind ausdrücklich willkommen.'
const YP_EN = 'An informal get-together of the VDE Young Net young professionals. Meet other young engineers, hear what is happening at Young Net and find out how you can help shape events yourself. Newcomers are very welcome.'
const TBA = ['Ort und Uhrzeit folgen.', 'Venue and time to be announced.']

// [title_de, title_en, start, end, format, type, goals, location, released, [de, en], fachgesellschaft, extras]
const notion = [
  ['Stammtisch YP', 'YP Get-together', '2027-01-12', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, [YP, YP_EN], null, { note: TBA }],
  ['YP Online-Workshop I: KI-Agenten', 'YP Online Workshop I: AI Agents', '2027-01-23', null, 'online', 'workshop', ['horizont'], null, true,
    ['Online-Workshop für Young Professionals rund um KI-Agenten: Was steckt dahinter, und wie lassen sie sich im Arbeitsalltag sinnvoll einsetzen? Der erste Workshop unserer Reihe 2027 zum Thema „Horizont erweitern“.',
      'Online workshop for young professionals on AI agents: what is behind them, and how can they be put to good use in everyday work? The first workshop in our 2027 series on broadening your horizons.'],
    null, { note: ['Genaues Programm und Anmeldung folgen.', 'Detailed programme and registration to follow.'] }],
  ['Junges Forum ITG', 'ITG Young Forum', '2027-03-14', null, 'praesenz', 'junges-forum', ['horizont', 'networking'], 'hamburg', false,
    ['Das Junge Forum der ITG (Informationstechnische Gesellschaft im VDE) ist das Programm für Studierende und Young Professionals im Vorfeld der GeMiC in Hamburg. Geplant sind Workshops und gegebenenfalls ein Hackathon – eine gute Gelegenheit, Fachleute und Gleichgesinnte kennenzulernen.',
      'The Young Forum of the ITG (Information Technology Society within VDE) is the programme for students and young professionals ahead of GeMiC in Hamburg. Workshops and possibly a hackathon are planned – a good opportunity to meet experts and like-minded peers.'],
    'ITG', { note: ['Programm folgt.', 'Programme to follow.'] }],
  ['GeMiC 2027', 'GeMiC 2027', '2027-03-15', '2027-03-17', 'praesenz', 'kongress', ['horizont', 'networking'], 'hamburg', false,
    ['Die 18. German Microwave Conference ist der wichtigste Kongress der ITG (Informationstechnische Gesellschaft im VDE). Gastgeber ist 2027 die Technische Universität Hamburg, in Kooperation mit IMA e.V. und VDE/ITG. Themen reichen von Radar und Sensorik über Kommunikationssysteme und Antennen bis zu Mikrowellen- und THz-Schaltungen – ein Treffpunkt für Industrie, Forschung und Hochschulen.\n\nDirekt davor findet das Junge Forum ITG für Studierende und Young Professionals statt.',
      'The 18th German Microwave Conference is the flagship congress of the ITG (Information Technology Society within VDE). The 2027 host is Hamburg University of Technology, in cooperation with IMA e.V. and VDE/ITG. Topics range from radar and sensing to communication systems, antennas, and microwave and THz circuits – a meeting point for industry, research and universities.\n\nThe ITG Young Forum for students and young professionals takes place immediately beforehand.'],
    'ITG', { tickets: true, link: ['https://www.vde.com/18th_german_microwave_conference_gemic_2027', 'GeMiC 2027 beim VDE', 'GeMiC 2027 at VDE'] }],
  ['embedded world', 'embedded world', '2027-03-16', '2027-03-18', 'praesenz', 'kongress', ['horizont', 'networking'], 'nuernberg', true,
    ['Die embedded world Exhibition & Conference ist die internationale Leitmesse für Embedded-Systeme und findet jährlich in Nürnberg statt. Aussteller und Fachkonferenz decken Themen wie Hardware, Software, Edge AI, Sicherheit elektronischer Systeme und IoT ab. Ideal, um neue Technologien zu entdecken und mit Unternehmen und anderen Young Professionals ins Gespräch zu kommen.\n\nDie embedded world ist eine Fachbesuchermesse; der Zutritt ist Fachbesucher:innen vorbehalten.',
      'embedded world Exhibition & Conference is the leading international trade fair for embedded systems and takes place in Nuremberg every year. Exhibitors and the conference cover hardware, software, edge AI, security of electronic systems and IoT. Ideal for discovering new technologies and talking to companies and other young professionals.\n\nembedded world is a trade-visitor fair; admission is reserved for trade visitors.'],
    null, { tickets: true, note: ['Ob ein gemeinsamer Young-Net-Besuch geplant ist, geben wir rechtzeitig bekannt.', 'We will announce in good time whether a joint Young Net visit is planned.'], link: ['https://www.messen.de/de/8554/nuernberg/embedded-world/info', 'embedded world 2027', 'embedded world 2027'] }],
  ['HANNOVER MESSE', 'HANNOVER MESSE', '2027-04-05', '2027-04-08', 'praesenz', 'kongress', ['horizont', 'networking'], 'hannover', true,
    ['Die HANNOVER MESSE gilt als Weltleitmesse der Industrie und findet an vier Tagen auf dem Messegelände Hannover statt. Schwerpunkte sind Automatisierung und Digitalisierung, Energie und industrielle Infrastruktur sowie Forschung und Technologietransfer, ergänzt durch ein umfangreiches Konferenzprogramm. Partnerland 2027 ist Spanien.',
      'HANNOVER MESSE is regarded as the world’s leading industrial trade fair and runs for four days at the Hanover exhibition grounds. Its focus areas are automation and digitalisation, energy and industrial infrastructure, and research and technology transfer, complemented by an extensive conference programme. The 2027 partner country is Spain.'],
    null, { tickets: true, note: ['Ob ein gemeinsamer Young-Net-Besuch geplant ist, geben wir rechtzeitig bekannt.', 'We will announce in good time whether a joint Young Net visit is planned.'], link: ['https://www.hannover.de/Veranstaltungskalender/Messen-Kongresse/Hannover-Messe-2027', 'HANNOVER MESSE 2027', 'HANNOVER MESSE 2027'] }],
  ['Stammtisch YP', 'YP Get-together', '2027-04-14', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, [YP, YP_EN], null, { note: TBA }],
  ['Junges Forum ETG', 'ETG Young Forum', '2027-04-25', null, 'praesenz', 'junges-forum', ['horizont', 'networking'], 'heidelberg', true,
    ['Das Junge Forum ETG ist das Satelliten-Event am Vortag des ETG-Kongresses in Heidelberg – für Studierende und Young Professionals der Energietechnik. Geplant sind Expertentalks, Exkursionen bzw. Firmenbesuche, Workshops und Networking. Wer noch nie auf einem Kongress war, findet hier Anschluss und kann anschließend gemeinsam am Kongress teilnehmen.',
      'The ETG Young Forum is the satellite event on the day before the ETG Congress in Heidelberg – for students and young professionals in power engineering. Expert talks, excursions or company visits, workshops and networking are planned. If you have never been to a congress, this is where you connect with others and can then attend the congress together.'],
    'ETG', { link: ['https://www.vde.com/de/vde-youngnet/aktivitaeten-/young-pro-aktionen/junges-forum-etg', 'Junges Forum ETG beim VDE Young Net', 'ETG Young Forum at VDE Young Net'] }],
  ['ETG-Kongress 2027', 'ETG Congress 2027', '2027-04-26', '2027-04-27', 'praesenz', 'kongress', ['horizont', 'networking'], 'heidelberg', true,
    ['Der ETG-Kongress ist das zentrale Treffen der Energietechnischen Gesellschaft im VDE und findet alle zwei Jahre statt – 2027 in Heidelberg. Im Fokus stehen Energietechnik, Netze und die Energiewende.\n\nAm Vortag findet das Junge Forum ETG für Studierende und Young Professionals statt; eine gemeinsame Teilnahme am Kongress ist möglich.',
      'The ETG Congress is the central meeting of the VDE Power Engineering Society and takes place every two years – in Heidelberg in 2027. The focus is on power engineering, grids and the energy transition.\n\nThe ETG Young Forum for students and young professionals takes place the day before; attending the congress together is possible.'],
    'ETG', { tickets: true, link: ['https://www.vde.com/de/vde-youngnet/aktivitaeten-/young-pro-aktionen/junges-forum-etg', 'Junges Forum ETG / ETG-Kongress beim VDE', 'ETG Young Forum / ETG Congress at VDE'] }],
  ['VDE Bayern Zukunftsforum', 'VDE Bayern Future Forum', '2027-04-29', '2027-04-30', 'praesenz', 'kongress', ['horizont', 'networking'], 'wuerzburg', true,
    ['Das VDE Bayern Zukunftsforum richtet sich an Nachwuchskräfte und junge Ingenieur:innen. 2027 steht es unter dem Motto „Sicherheit im Wandel: Zwischen Cyber Security und Cyber Defense“ und findet gemeinsam mit der Technischen Hochschule Würzburg-Schweinfurt statt. Es erwarten euch Expertenvorträge, ein Tec Talk, Sessions und ein Netzwerkabend.',
      'The VDE Bayern Future Forum is aimed at early-career engineers. In 2027 its motto is “Security in transition: between cyber security and cyber defence”, held together with the Technical University of Applied Sciences Würzburg-Schweinfurt. Expect expert talks, a Tec Talk, sessions and a networking evening.'],
    null, { price: 25, priceNote: ['Zweitägige Teilnahme ab 25 € inklusive Verpflegung (laut VDE Bayern).', 'Two-day attendance from €25 including catering (according to VDE Bayern).'], note: ['Die Anmeldung öffnet laut Veranstalter in den nächsten Wochen.', 'According to the organiser, registration opens in the coming weeks.'], link: ['https://www.vde-bayern.de/de/veranstaltungen/vde-bayern-zukunftsforum', 'VDE Bayern Zukunftsforum 2027', 'VDE Bayern Future Forum 2027'] }],
  ['YP Workshop II: Soft Skills', 'YP Workshop II: Soft Skills', '2027-05-01', null, 'online', 'workshop', ['horizont'], null, true,
    ['Workshop für Young Professionals zu Soft Skills – der zweite Workshop unserer Reihe 2027. Thema und Format werden noch festgelegt.',
      'Soft-skills workshop for young professionals – the second workshop in our 2027 series. Topic and format are still being finalised.'],
    null, { note: ['Details und Anmeldung folgen.', 'Details and registration to follow.'] }],
  ['ZVEI eSummit', 'ZVEI eSummit', '2027-05-12', '2027-05-13', 'praesenz', 'kongress', ['horizont', 'networking'], 'berlin', true,
    ['Der eSummit ist das jährliche Gipfeltreffen des ZVEI, des Verbands der Elektro- und Digitalindustrie, mit Vertreter:innen aus Politik, Wirtschaft, Wissenschaft und Gesellschaft in Berlin. Im Mittelpunkt stehen Zukunftsthemen der Branche wie industrielle KI, Mikroelektronik und Elektrifizierung.',
      'The eSummit is the annual summit of ZVEI, the German Electro and Digital Industry Association, bringing together representatives of politics, business, science and society in Berlin. It centres on the industry’s key future topics such as industrial AI, microelectronics and electrification.'],
    null, { tickets: true, note: ['Programm und Veranstaltungsort 2027 gibt der ZVEI noch bekannt.', 'ZVEI will announce the 2027 programme and venue.'], link: ['https://www.esummit.zvei.org/', 'ZVEI eSummit', 'ZVEI eSummit'] }],
  ['Stammtisch YP', 'YP Get-together', '2027-07-08', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, [YP, YP_EN], null, { note: TBA }],
  ['YP-Meetup III', 'YP Meetup III', '2027-09-17', '2027-09-19', 'praesenz', 'yp-meetup', ['networking', 'onboarding'], null, false,
    ['Treffen der Young Professionals aus ganz Deutschland, zentral in der Mitte Deutschlands. Gemeinsam blicken wir auf das Jahr, planen kommende Events und lernen uns besser kennen. Wer bei Young Net mitgestalten möchte, ist herzlich eingeladen.',
      'A meeting of young professionals from all over Germany, held centrally in the middle of the country. Together we look back on the year, plan upcoming events and get to know each other better. Anyone who wants to help shape Young Net is warmly invited.'],
    null, { note: ['Details folgen.', 'Details to follow.'] }],
  ['Junges Forum BMT', 'BMT Young Forum', '2027-09-27', null, 'praesenz', 'junges-forum', ['horizont', 'networking'], 'rostock', false,
    ['Das Junge Forum zur BMT-Tagung (Biomedizinische Technik) ist das Programm für Studierende und Young Professionals am Vortag der Tagung – mit Austausch und Networking.',
      'The Young Forum at the BMT conference (biomedical engineering) is the programme for students and young professionals on the day before the conference – with exchange and networking.'],
    'DGBMT', { note: ['Programm folgt.', 'Programme to follow.'] }],
  ['BMT 2027', 'BMT 2027', '2027-09-28', '2027-09-30', 'praesenz', 'kongress', ['horizont', 'networking'], 'rostock', false,
    ['Die BMT ist die Jahrestagung der Deutschen Gesellschaft für Biomedizinische Technik im VDE (VDE DGBMT) und eine der wichtigsten Konferenzen der Medizintechnikforschung im deutschsprachigen Raum. 2027 findet die 61. Ausgabe in der Stadthalle Rostock statt – mit Keynotes, Fachvorträgen, Postersessions und Workshops, unter anderem zu Robotik, Implantaten und Biomaterialien sowie Foundation Models in der Biomedizintechnik.\n\nAm Vortag findet traditionell das Junge Forum BMT für Studierende und Young Professionals statt.',
      'BMT is the annual conference of the German Society for Biomedical Engineering within VDE (VDE DGBMT) and one of the most important medical-technology research conferences in the German-speaking world. The 61st edition takes place at Stadthalle Rostock in 2027 – with keynotes, talks, poster sessions and workshops on robotics, implants and biomaterials, and foundation models in biomedical engineering, among others.\n\nThe BMT Young Forum for students and young professionals traditionally takes place the day before.'],
    'DGBMT', { tickets: true, link: ['https://www.bmt-congress.de/vde-annual-congress-bmt', 'BMT 2027 Rostock', 'BMT 2027 Rostock'] }],
  ['Stammtisch YP', 'YP Get-together', '2027-10-05', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, [YP, YP_EN], null, { note: TBA }],
  ['Microelectronics and Systems Congress', 'Microelectronics and Systems Congress', '2027-10-25', '2027-10-27', 'praesenz', 'kongress', ['horizont', 'networking'], 'luebeck', false,
    ['Der frühere MikroSystemTechnik-Kongress – eine gemeinsame Veranstaltung von BMFTR und VDE – findet 2027 unter dem neuen Namen „Microelectronics and Systems Congress“ in Lübeck statt. Leitthema ist „Progress for Humanity – Technologies for Sustainability, Health and Quality of Life“. Der Kongress versteht sich als Plattform für Wissenschaft, Industrie und Nachwuchs in Mikroelektronik und Mikrosystemtechnik.\n\nIn den vergangenen Ausgaben gab es mit dem Jungen Forum MST und der VDE Young Net Lounge ein eigenes Programm für Studierende und Young Professionals.',
      'The former MikroSystemTechnik Congress – a joint event of BMFTR and VDE – takes place in Lübeck in 2027 under its new name, “Microelectronics and Systems Congress”. Its theme is “Progress for Humanity – Technologies for Sustainability, Health and Quality of Life”. The congress is a platform for science, industry and young talent in microelectronics and microsystems technology.\n\nPrevious editions offered a dedicated programme for students and young professionals with the MST Young Forum and the VDE Young Net Lounge.'],
    'GMM', { tickets: true, link: ['https://www.microelectronics-systems-congress.de/en', 'Microelectronics and Systems Congress 2027', 'Microelectronics and Systems Congress 2027'] }],
  ['Elektronik-Fachmesse München', 'Electronics Trade Fair Munich', '2027-11-13', '2027-11-14', 'praesenz', 'kongress', ['horizont', 'networking'], 'muenchen', false,
    ['Fachmesse für Elektronik auf dem Messegelände München: Bauelemente, Systeme und Fertigung, ergänzt durch Fachforen. Eine gute Gelegenheit, Unternehmen der Branche kennenzulernen und sich über Einstiegsmöglichkeiten zu informieren.',
      'Electronics trade fair at the Munich exhibition grounds: components, systems and manufacturing, complemented by expert forums. A good opportunity to meet companies in the industry and find out about entry-level opportunities.'],
    null, { tickets: true, note: ['Ob ein gemeinsamer Young-Net-Besuch geplant ist, geben wir rechtzeitig bekannt.', 'We will announce in good time whether a joint Young Net visit is planned.'] }],
  ['YP Regional: Weihnachtsmarkt', 'YP Regional: Christmas Market', '2027-12-10', null, 'dezentral', 'regional', ['networking'], 'alle-bvs', true,
    ['An einem Abend in ganz Deutschland: Die VDE-Bezirksvereine laden Young Professionals zu einem gemeinsamen Weihnachtsmarkt-Besuch vor Ort ein. Lerne Young Net in deiner Region kennen und lass das Jahr gemeinsam ausklingen.',
      'One evening all over Germany: the VDE district associations invite young professionals to a joint visit to their local Christmas market. Get to know Young Net in your region and round off the year together.'],
    null, { note: ['Welche Städte dabei sind, geben wir rechtzeitig bekannt.', 'We will announce the participating cities in good time.'] }],
]

const organizerFor = (title, fg, format) => {
  if (fg) return `VDE ${fg}`
  if (/Bayern/.test(title)) return 'VDE Bayern'
  if (format === 'dezentral') return 'VDE-Bezirksvereine'
  if (/MESSE|world|eSummit|Fachmesse/i.test(title)) return 'VDE Young Net'
  return 'VDE Young Net Young Professionals'
}

const events = notion.map(([title_de, title_en, start, end, format, type, goals, location, ok, [dDe, dEn], fg = null, x = {}], i) => ({
  id: `n${String(i + 1).padStart(2, '0')}`,
  slug: `${slugify(title_de)}-${start}`,
  title_de, title_en,
  description_de: dDe, description_en: dEn,
  ...(x.note ? { note_de: x.note[0], note_en: x.note[1] } : {}),
  ...(x.link ? { link: { url: x.link[0], label_de: x.link[1], label_en: x.link[2] } } : {}),
  start, end: end ?? start,
  format, type, goals,
  audience: 'young-professionals',
  location: format === 'online' ? 'online' : location,
  region: null, bv: null,
  fachgesellschaft: fg,
  organizer: organizerFor(title_de, fg, format),
  price_member: x.price ?? 0, price_nonmember: x.price ?? 0,
  ...(x.priceNote ? { price_note_de: x.priceNote[0], price_note_en: x.priceNote[1] } : {}),
  ...(x.tickets ? { tickets_url: TICKETS } : {}),
  language: 'de',
  status: ok ? 'published' : 'pending',
  source: 'notion',
  cover: (i % 4) + 1,
  added: '2026-10-25',
}))

// Student-group and regional events that complete the calendar
const hub = [
  { title_de: 'Hochschulgruppen Get Together Reloaded', title_en: 'Student Group Get Together Reloaded', start: '2026-11-06', end: '2026-11-08', format: 'praesenz', type: 'regional', goals: ['networking', 'onboarding'], audience: 'students', location: 'zwickau', bv: 'bv-chemnitz', organizer: 'VDE Young Net', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Das jährliche Treffen der VDE Hochschulgruppen aus ganz Deutschland – 2026 zu Gast bei der Hochschulgruppe Zwickau. Drei Tage Workshops, Erfahrungsaustausch zwischen den Gruppen und gemeinsames Abendprogramm.',
    description_en: 'The annual meeting of VDE student groups from all over Germany – hosted by the Zwickau student group in 2026. Three days of workshops, exchange between groups and a joint evening programme.',
    link: { url: 'https://www.vde.com/de/vde-youngnet/aktuelles/hsgt-zwickau-reloaded', label_de: 'HSGT Zwickau beim VDE Young Net', label_en: 'HSGT Zwickau at VDE Young Net' } },
  { title_de: 'Stammtisch der Hochschulgruppe KIT', title_en: 'KIT Student Group Get-together', start: '2026-11-12', format: 'praesenz', type: 'stammtisch', goals: ['networking', 'onboarding'], audience: 'students', location: 'karlsruhe', bv: 'bv-mittelbaden', organizer: 'VDE Hochschulgruppe KIT Karlsruhe', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Offener Abend für Studierende der Elektro- und Informationstechnik: neue Leute kennenlernen und erfahren, was die Hochschulgruppe im Wintersemester vorhat. Erstsemester sind besonders willkommen.',
    description_en: 'An open evening for electrical engineering and IT students: meet new people and hear what the student group has planned for the winter semester. First-year students are especially welcome.' },
  { title_de: 'Löt-Workshop für Erstsemester', title_en: 'Soldering Workshop for First-Year Students', start: '2026-11-26', format: 'praesenz', type: 'workshop', goals: ['horizont', 'onboarding'], audience: 'students', location: 'darmstadt', bv: 'bv-rhein-main', organizer: 'VDE Hochschulgruppe ETV Darmstadt', price_member: 0, price_nonmember: 10, language: 'de',
    description_de: 'Einen kleinen Elektronik-Bausatz selbst löten: Die Hochschulgruppe stellt Material und Werkzeug, erfahrene Mitglieder helfen. Vorkenntnisse sind nicht nötig.',
    description_en: 'Solder a small electronics kit yourself: the student group provides materials and tools, experienced members are there to help. No prior knowledge needed.' },
  { title_de: 'Bewerbungstraining für Praktikum und Abschlussarbeit', title_en: 'Application Training for Internships and Theses', start: '2026-12-03', format: 'online', type: 'workshop', goals: ['horizont'], audience: 'students', location: 'online', bv: null, organizer: 'VDE Young Net', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Lebenslauf, Anschreiben, erstes Vorstellungsgespräch: kompakte Tipps für Praktikum, Werkstudierendenstelle und Abschlussarbeit in der Elektro- und Informationstechnik.',
    description_en: 'CV, cover letter, first interview: compact advice for internships, working-student roles and theses in electrical engineering and IT.' },
  { title_de: 'Semesterstammtisch HTW Dresden', title_en: 'HTW Dresden Semester Get-together', start: '2027-01-20', format: 'praesenz', type: 'stammtisch', goals: ['networking'], audience: 'students', location: 'dresden', bv: 'bv-dresden', organizer: 'VDE Hochschulgruppe an der HTW Dresden', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Treffen der Hochschulgruppe zum Semesterende – mit einer kurzen Vorstellung des Mentoring-Programms von VDE Young Net.',
    description_en: 'The student group’s end-of-semester meeting – including a short introduction to the VDE Young Net mentoring programme.' },
  { title_de: 'YP-Abend: Führung ohne Titel', title_en: 'YP Evening: Leading without a Title', start: '2027-02-10', format: 'praesenz', type: 'workshop', goals: ['horizont', 'networking'], audience: 'young-professionals', location: 'muenchen', bv: 'bv-bayern', organizer: 'VDE Bayern Young Net', price_member: 0, price_nonmember: 25, language: 'de',
    description_de: 'Impulsvortrag und Diskussion für die ersten Berufsjahre: Wie übernimmt man Verantwortung in Projekten, bevor man Führungskraft ist? Anschließend Get-together.',
    description_en: 'Short talk and discussion for early-career engineers: how do you take responsibility in projects before you are a manager? Followed by a get-together.' },
  { title_de: 'Hackathon „Smart Grid“', title_en: 'Smart Grid Hackathon', start: '2027-02-20', end: '2027-02-21', format: 'praesenz', type: 'hackathon', goals: ['horizont', 'networking'], audience: 'students', location: 'aachen', bv: 'bv-aachen', fachgesellschaft: 'ETG', organizer: 'VDE Hochschulgruppe Aachen', price_member: 0, price_nonmember: 15, language: 'en',
    description_de: '24 Stunden, Teams aus drei bis fünf Personen, reale Lastgangdaten eines Verteilnetzes. Mentor:innen aus der Energiewirtschaft begleiten die Teams; Verpflegung ist inklusive.',
    description_en: '24 hours, teams of three to five, real load-profile data from a distribution grid. Mentors from the energy industry support the teams; food is included.' },
  { title_de: 'Karriere-Speed-Dating', title_en: 'Career Speed Dating', start: '2027-03-03', format: 'praesenz', type: 'regional', goals: ['networking'], audience: 'all', location: 'koeln', bv: 'bv-koeln', organizer: 'VDE Bezirk Köln', price_member: 0, price_nonmember: 20, language: 'de',
    description_de: 'Studierende und Young Professionals treffen Unternehmen aus der Region in kurzen Zehn-Minuten-Gesprächen – für Praktikum, Abschlussarbeit oder den ersten Job.',
    description_en: 'Students and young professionals meet regional companies in short ten-minute conversations – for internships, theses or a first job.' },
  { title_de: 'Exkursion: Umspannwerk', title_en: 'Excursion: Substation', start: '2027-05-20', format: 'praesenz', type: 'exkursion', goals: ['horizont'], audience: 'students', location: 'stuttgart', bv: 'bv-wuerttemberg', fachgesellschaft: 'ETG', organizer: 'VDE Bezirksverein Württemberg', price_member: 0, price_nonmember: 5, language: 'de',
    description_de: 'Führung durch ein Umspannwerk mit anschließender Fragerunde mit den Netzingenieur:innen vor Ort. Die Teilnehmerzahl ist begrenzt.',
    description_en: 'Guided tour of a substation followed by a Q&A with the grid engineers on site. Places are limited.' },
  // past, with recaps (archive)
  { title_de: 'Sommer-Stammtisch der Hochschulgruppe KIT', title_en: 'KIT Student Group Summer Get-together', start: '2026-06-18', format: 'praesenz', type: 'stammtisch', goals: ['networking', 'onboarding'], audience: 'students', location: 'karlsruhe', bv: 'bv-mittelbaden', organizer: 'VDE Hochschulgruppe KIT Karlsruhe', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Sommer-Stammtisch der Hochschulgruppe im Biergarten.', description_en: 'The student group’s summer get-together in a beer garden.',
    recap: { participants: 23, photos: 0, text_de: 'Gut besucht, viele Erstsemester. Drei Teilnehmende wollen beim nächsten Event mitorganisieren.', text_en: 'Well attended, with many first-year students. Three participants want to help organise the next event.', quote_de: '„Wir hatten mit zehn Leuten gerechnet.“', quote_en: '“We were expecting ten people.”' } },
  { title_de: 'YP Online-Workshop: Zeitmanagement', title_en: 'YP Online Workshop: Time Management', start: '2026-09-10', format: 'online', type: 'workshop', goals: ['horizont'], audience: 'young-professionals', location: 'online', bv: null, organizer: 'VDE Young Net Young Professionals', price_member: 0, price_nonmember: 15, language: 'de',
    description_de: 'Methoden für Projektarbeit im ersten Job.', description_en: 'Methods for project work in your first job.',
    recap: { participants: 41, photos: 0, text_de: '90 Minuten, drei Methoden, viel Austausch im Chat. Die Folien stehen Mitgliedern zur Verfügung.', text_en: '90 minutes, three methods, lots of discussion in the chat. The slides are available to members.', quote_de: '„Direkt am nächsten Tag ausprobiert.“', quote_en: '“Tried it out the very next day.”' } },
  { title_de: 'Hackathon „Embedded“', title_en: 'Embedded Hackathon', start: '2026-05-09', end: '2026-05-10', format: 'praesenz', type: 'hackathon', goals: ['horizont', 'networking'], audience: 'students', location: 'darmstadt', bv: 'bv-rhein-main', organizer: 'VDE Hochschulgruppe ETV Darmstadt', price_member: 0, price_nonmember: 15, language: 'en',
    description_de: 'Zwei Tage Firmware, Sensoren und Teamarbeit.', description_en: 'Two days of firmware, sensors and teamwork.',
    recap: { participants: 34, photos: 0, text_de: 'Acht Teams, Siegerprojekt: ein energiesparender Sensorknoten, der Luftqualität und Belegung von Hörsälen misst.', text_en: 'Eight teams; the winning project was a low-power sensor node that measures air quality and occupancy in lecture halls.', quote_de: '„Nächstes Jahr wieder – mit mehr Steckdosen.“', quote_en: '“Again next year – with more power sockets.”' } },
]

const regionOf = { karlsruhe: 'suedwest', stuttgart: 'suedwest', heidelberg: 'suedwest', darmstadt: 'suedwest', wuerzburg: 'bayern', nuernberg: 'bayern', muenchen: 'bayern', aachen: 'west', koeln: 'west', dresden: 'ost-mitte', zwickau: 'ost-mitte', berlin: 'ost-mitte', luebeck: 'hanse', rostock: 'hanse', hamburg: 'hanse', hannover: 'hanse' }

const all = [...events, ...hub.map((d, i) => ({
  id: `d${String(i + 1).padStart(2, '0')}`,
  slug: `${slugify(d.title_de)}-${d.start}`,
  end: d.start, fachgesellschaft: null, region: null,
  organizer: d.organizer ?? (d.audience === 'students' ? 'VDE Hochschulgruppe' : 'VDE Young Net'),
  status: 'published', source: 'hub', cover: (i % 4) + 1, added: `2026-10-${String(10 + i).padStart(2, '0')}`,
  ...d,
}))].map((e) => ({ ...e, region: e.region ?? regionOf[e.location] ?? (e.format === 'praesenz' ? null : 'bundesweit') }))

writeFileSync(new URL('../src/data/events.json', import.meta.url), JSON.stringify(all, null, 2) + '\n')
console.log(`wrote ${all.length} events`)
