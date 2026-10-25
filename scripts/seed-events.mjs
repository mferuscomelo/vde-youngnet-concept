// One-off generator for src/data/events.json. Notion rows are copied verbatim
// from "Events 2027 – Öffentlich" (25 Oct 2026); demo rows are clearly prefixed "Beispiel".
import { writeFileSync } from 'node:fs'

const slugify = (s) => s.toLowerCase()
  .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const D = {
  stammtisch: ['Lockerer Online-Austausch für Young Professionals: Neuigkeiten aus dem Netzwerk, Fragen zum Berufseinstieg, neue Gesichter kennenlernen.',
    'Casual online get-together for young professionals: network news, questions about early career, meeting new people.'],
  workshop: (de, en) => [`Online-Workshop zum Thema ${de}. Interaktiv, mit Übungen in Kleingruppen.`, `Online workshop on ${en}. Interactive, with small-group exercises.`],
  jf: (fg) => [`Das Junge Forum der ${fg}: Nachwuchs präsentiert eigene Arbeiten, Austausch mit Fachleuten am Vortag der Fachtagung.`,
    `The ${fg} Young Forum: early-career engineers present their work and meet experts the day before the main conference.`],
  fair: (n) => [`Gemeinsamer Besuch der ${n} als YoungNet-Gruppe: Messerundgang, Treffpunkt für Mitglieder, Austausch mit Ausstellern.`,
    `Joint visit to ${n} as a YoungNet group: guided walk, meeting point for members, conversations with exhibitors.`],
  congress: (n) => [`${n}: Fachvorträge, Posterausstellung und Networking. YoungNet-Mitglieder treffen sich vor Ort.`,
    `${n}: talks, poster sessions and networking. YoungNet members meet up on site.`],
}

const notion = [
  ['Stammtisch YP', 'YP Regulars\' Table', '2027-01-12', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, D.stammtisch],
  ['YP Online-Workshop I: KI-Agenten', 'YP Online Workshop I: AI Agents', '2027-01-23', null, 'online', 'workshop', ['horizont'], null, true, D.workshop('KI-Agenten', 'AI agents')],
  ['Junges Forum ITG', 'ITG Young Forum', '2027-03-14', null, 'praesenz', 'junges-forum', ['horizont', 'networking'], 'hamburg', false, D.jf('ITG'), 'ITG'],
  ['GEMIC', 'GeMiC', '2027-03-15', '2027-03-17', 'praesenz', 'kongress', ['horizont', 'networking'], 'hamburg', false, D.congress('GeMiC (German Microwave Conference)')],
  ['embedded world', 'embedded world', '2027-03-16', '2027-03-18', 'praesenz', 'kongress', ['horizont', 'networking'], 'nuernberg', true, D.fair('embedded world')],
  ['Hannover Messe', 'Hannover Messe', '2027-04-05', '2027-04-08', 'praesenz', 'kongress', ['horizont', 'networking'], 'hannover', true, D.fair('Hannover Messe')],
  ['Stammtisch YP', 'YP Regulars\' Table', '2027-04-14', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, D.stammtisch],
  ['Junges Forum ETG', 'ETG Young Forum', '2027-04-25', null, 'praesenz', 'junges-forum', ['horizont', 'networking'], 'heidelberg', true, D.jf('ETG'), 'ETG'],
  ['ETG-Kongress', 'ETG Congress', '2027-04-26', '2027-04-27', 'praesenz', 'kongress', ['horizont', 'networking'], 'heidelberg', true, D.congress('ETG-Kongress'), 'ETG'],
  ['VDE Bayern Zukunftsforum', 'VDE Bayern Future Forum', '2027-04-29', '2027-04-30', 'praesenz', 'kongress', ['horizont', 'networking'], 'wuerzburg', true, D.congress('VDE Bayern Zukunftsforum')],
  ['YP Workshop II: Soft Skills', 'YP Workshop II: Soft Skills', '2027-05-01', null, 'online', 'workshop', ['horizont'], null, true, D.workshop('Soft Skills', 'soft skills')],
  ['E-Summit ZVEI', 'ZVEI E-Summit', '2027-05-12', '2027-05-13', 'praesenz', 'kongress', ['horizont', 'networking'], 'berlin', true, D.congress('E-Summit (ZVEI)')],
  ['Stammtisch YP', 'YP Regulars\' Table', '2027-07-08', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, D.stammtisch],
  ['YP-Meetup III', 'YP Meetup III', '2027-09-17', '2027-09-19', 'praesenz', 'yp-meetup', ['networking', 'onboarding'], null, false,
    ['Wochenende für Young Professionals aus ganz Deutschland: Workshops, Firmenbesuch, Abendprogramm.', 'Weekend for young professionals from all over Germany: workshops, company visit, evening programme.']],
  ['Junges Forum BMT', 'BMT Young Forum', '2027-09-27', null, 'praesenz', 'junges-forum', ['horizont', 'networking'], null, false, D.jf('DGBMT'), 'DGBMT'],
  ['BMT-Tagung', 'BMT Conference', '2027-09-28', '2027-09-30', 'praesenz', 'kongress', ['horizont', 'networking'], null, false, D.congress('BMT-Jahrestagung'), 'DGBMT'],
  ['Stammtisch YP', 'YP Regulars\' Table', '2027-10-05', null, 'online', 'stammtisch', ['networking', 'onboarding'], null, true, D.stammtisch],
  ['MST-Kongress', 'MST Congress', '2027-10-25', '2027-10-27', 'praesenz', 'kongress', ['horizont', 'networking'], null, false, D.congress('MikroSystemTechnik-Kongress'), 'GMM'],
  ['Elektronik-Fachmesse München', 'Electronics Trade Fair Munich', '2027-11-13', '2027-11-14', 'praesenz', 'kongress', ['horizont', 'networking'], 'muenchen', false, D.fair('Elektronik-Fachmesse')],
  ['YP Regional Weihnachtsmarkt IV', 'YP Regional Christmas Market IV', '2027-12-10', null, 'dezentral', 'regional', ['networking'], 'alle-bvs', true,
    ['Am selben Abend treffen sich Young Professionals in vielen Bezirksvereinen auf dem jeweiligen Weihnachtsmarkt.', 'On the same evening, young professionals meet at the local Christmas market in many districts.']],
]

const organizerFor = (title, fg, format) => {
  if (fg) return `VDE ${fg}`
  if (/Bayern/.test(title)) return 'VDE Bayern'
  if (format === 'dezentral') return 'Alle Bezirksvereine'
  if (/messe|world|GEMIC|Summit/i.test(title)) return 'VDE YoungNet (Gruppenbesuch)'
  return 'VDE YoungNet Young Professionals'
}

const events = notion.map(([title_de, title_en, start, end, format, type, goals, location, ok, [dDe, dEn], fg = null], i) => ({
  id: `n${String(i + 1).padStart(2, '0')}`,
  slug: `${slugify(title_de)}-${start}`,
  title_de, title_en,
  description_de: dDe, description_en: dEn,
  start, end: end ?? start,
  format, type, goals,
  audience: 'young-professionals',
  location: format === 'online' ? 'online' : location,
  region: null, bv: null,
  fachgesellschaft: fg,
  organizer: organizerFor(title_de, fg, format),
  price_member: null, price_nonmember: null,
  language: 'de',
  status: ok ? 'published' : 'pending',
  source: 'notion',
  cover: (i % 4) + 1,
  added: '2026-10-25',
}))

const demo = [
  { title_de: 'Beispiel: HSG-Stammtisch Karlsruhe', title_en: 'Sample: Student group meetup Karlsruhe', start: '2026-11-12', format: 'praesenz', type: 'stammtisch', goals: ['networking', 'onboarding'], audience: 'students', location: 'karlsruhe', bv: 'bv-p-sw', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Offener Abend für Studierende: neue Leute kennenlernen, erfahren, was die Hochschulgruppe vorhat.', description_en: 'Open evening for students: meet new people and hear what the student group is planning.' },
  { title_de: 'Beispiel: Löt-Workshop für Erstis', title_en: 'Sample: Soldering workshop for first-years', start: '2026-11-26', format: 'praesenz', type: 'workshop', goals: ['horizont', 'onboarding'], audience: 'students', location: 'darmstadt', bv: 'bv-p-mi', price_member: 0, price_nonmember: 10, language: 'de',
    description_de: 'Einen kleinen Bausatz selbst löten – Material wird gestellt, keine Vorkenntnisse nötig.', description_en: 'Solder a small kit yourself – materials provided, no prior knowledge needed.' },
  { title_de: 'Beispiel: Bewerbungstraining online', title_en: 'Sample: Online application training', start: '2026-12-03', format: 'online', type: 'workshop', goals: ['horizont'], audience: 'students', location: 'online', bv: null, price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Lebenslauf, Anschreiben, erstes Interview: Tipps für Praktikum, Werkstudentenjob und Abschlussarbeit.', description_en: 'CV, cover letter, first interview: tips for internships, working-student jobs and theses.' },
  { title_de: 'Beispiel: Uni-Stammtisch Dresden', title_en: 'Sample: University meetup Dresden', start: '2027-01-20', format: 'praesenz', type: 'stammtisch', goals: ['networking'], audience: 'students', location: 'dresden', bv: 'bv-p-os', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Monatlicher Treff der Studierenden – diesmal mit kurzer Vorstellung des Mentoring-Programms.', description_en: 'Monthly student meetup – this time with a short intro to the mentoring programme.' },
  { title_de: 'Beispiel: Hackathon „Smart Grid“', title_en: 'Sample: Smart Grid Hackathon', start: '2027-02-20', end: '2027-02-21', format: 'praesenz', type: 'hackathon', goals: ['horizont', 'networking'], audience: 'students', location: 'aachen', bv: 'bv-p-we', fachgesellschaft: 'ETG', price_member: 0, price_nonmember: 15, language: 'en',
    description_de: '24 Stunden, Teams aus 3–5 Leuten, echte Lastgang-Daten. Verpflegung inklusive.', description_en: '24 hours, teams of 3–5, real load-profile data. Food included.' },
  { title_de: 'Beispiel: Karriere-Speed-Dating', title_en: 'Sample: Career speed dating', start: '2027-03-03', format: 'praesenz', type: 'regional', goals: ['networking'], audience: 'all', location: 'koeln', bv: 'bv-p-we', price_member: 0, price_nonmember: 20, language: 'de',
    description_de: 'Studierende und Young Professionals treffen Unternehmen aus der Region in 10-Minuten-Gesprächen.', description_en: 'Students and young professionals meet regional companies in 10-minute conversations.' },
  { title_de: 'Beispiel: Exkursion Umspannwerk', title_en: 'Sample: Excursion to a substation', start: '2027-05-20', format: 'praesenz', type: 'exkursion', goals: ['horizont'], audience: 'students', location: 'stuttgart', bv: 'bv-p-sw', fachgesellschaft: 'ETG', price_member: 0, price_nonmember: 5, language: 'de',
    description_de: 'Führung durch ein Umspannwerk mit Fragerunde. Teilnehmerzahl begrenzt.', description_en: 'Guided tour of a substation with Q&A. Limited places.' },
  { title_de: 'Beispiel: YP-Abend „Führung ohne Titel“', title_en: 'Sample: YP evening "Leading without a title"', start: '2027-02-10', format: 'praesenz', type: 'workshop', goals: ['horizont', 'networking'], audience: 'young-professionals', location: 'muenchen', bv: 'bv-p-su', price_member: 0, price_nonmember: 25, language: 'de',
    description_de: 'Impulsvortrag und Diskussion für die ersten Berufsjahre, danach Get-together.', description_en: 'Short talk and discussion for early-career engineers, followed by a get-together.' },
  // past, with recaps (archive)
  { title_de: 'Beispiel: HSG-Stammtisch Sommer', title_en: 'Sample: Student group summer meetup', start: '2026-06-18', format: 'praesenz', type: 'stammtisch', goals: ['networking', 'onboarding'], audience: 'students', location: 'karlsruhe', bv: 'bv-p-sw', price_member: 0, price_nonmember: 0, language: 'de',
    description_de: 'Sommer-Stammtisch der Hochschulgruppe im Biergarten.', description_en: 'Summer meetup of the student group in a beer garden.',
    recap: { participants: 23, photos: 3, text_de: 'Gut besucht, viele Erstsemester. Drei Leute wollen beim nächsten Event mitorganisieren.', text_en: 'Well attended, lots of first-years. Three people want to help organise the next event.', quote_de: '„Wir hatten mit zehn Leuten gerechnet.“', quote_en: '"We were expecting ten people."' } },
  { title_de: 'Beispiel: YP Online-Workshop „Zeitmanagement“', title_en: 'Sample: YP online workshop "Time management"', start: '2026-09-10', format: 'online', type: 'workshop', goals: ['horizont'], audience: 'young-professionals', location: 'online', bv: null, price_member: 0, price_nonmember: 15, language: 'de',
    description_de: 'Methoden für Projektarbeit im ersten Job.', description_en: 'Methods for project work in your first job.',
    recap: { participants: 41, photos: 2, text_de: '90 Minuten, drei Methoden, viel Austausch im Chat. Folien stehen Mitgliedern zur Verfügung.', text_en: '90 minutes, three methods, lots of chat discussion. Slides available to members.', quote_de: '„Direkt am nächsten Tag ausprobiert.“', quote_en: '"Tried it out the very next day."' } },
  { title_de: 'Beispiel: Hackathon „Embedded“', title_en: 'Sample: Embedded hackathon', start: '2026-05-09', end: '2026-05-10', format: 'praesenz', type: 'hackathon', goals: ['horizont', 'networking'], audience: 'students', location: 'darmstadt', bv: 'bv-p-mi', price_member: 0, price_nonmember: 15, language: 'en',
    description_de: 'Zwei Tage Firmware, Sensoren und Pizza.', description_en: 'Two days of firmware, sensors and pizza.',
    recap: { participants: 34, photos: 3, text_de: 'Acht Teams, Siegerprojekt: ein Low-Power-Sensorknoten für Hörsäle.', text_en: 'Eight teams; winning project: a low-power sensor node for lecture halls.', quote_de: '„Nächstes Jahr wieder – mit mehr Steckdosen.“', quote_en: '"Again next year – with more power sockets."' } },
]

const regionOf = { karlsruhe: 'suedwest', stuttgart: 'suedwest', heidelberg: 'suedwest', darmstadt: 'mitte', aachen: 'west', koeln: 'west', dresden: 'ost', berlin: 'ost', muenchen: 'sued', nuernberg: 'sued', wuerzburg: 'sued', hamburg: 'nord', hannover: 'nord' }

const all = [...events, ...demo.map((d, i) => ({
  id: `d${String(i + 1).padStart(2, '0')}`,
  slug: `${slugify(d.title_de)}-${d.start}`,
  end: d.start, fachgesellschaft: null, region: null,
  organizer: d.audience === 'students' ? 'Hochschulgruppe (Platzhalter)' : 'YoungNet-Team (Platzhalter)',
  status: 'published', source: 'demo', cover: (i % 4) + 1, added: `2026-10-${String(10 + i).padStart(2, '0')}`,
  ...d,
}))].map((e) => ({ ...e, region: e.region ?? regionOf[e.location] ?? (e.format === 'praesenz' ? null : 'bundesweit') }))

writeFileSync(new URL('../src/data/events.json', import.meta.url), JSON.stringify(all, null, 2) + '\n')
console.log(`wrote ${all.length} events`)
