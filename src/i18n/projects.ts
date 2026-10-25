import type { Dict } from '.'

const de = {
  title: 'Projekt-Showcase',
  lead: 'Was Studierende und Young Professionals bauen: Robotik, Firmware, Embedded, Hackathon-Ergebnisse. Zum Nachmachen, Mitmachen und Kontakte knüpfen.',
  sampleNote: 'Alle Projekte sind Beispieleinträge; Teams und Links sind erfunden.',
  filter: 'Nach Thema filtern',
  allTags: 'Alle',
  results: '{n} Projekte',
  link: 'Zum Projekt',
  linkNote: '(Platzhalter-Link)',
  tags: { robotik: 'Robotik', embedded: 'Embedded', firmware: 'Firmware', hackathon: 'Hackathon', iot: 'IoT', energie: 'Energie', fpga: 'FPGA' } as Record<string, string>,
  form: {
    title: 'Projekt einreichen',
    intro: 'Du hast etwas gebaut? Zeig es der Community. Ein Foto und drei Sätze reichen.',
    name: 'Projektname',
    team: 'Team',
    tags: 'Themen',
    text: 'Kurzbeschreibung',
    link: 'Link (Repo, Video, Blog)',
    contact: 'Kontakt-E-Mail',
    required: 'Pflichtfeld',
    submit: 'Projekt einreichen',
    done: 'Danke! Das Projekt wäre jetzt in der Prüfung. (Demo: nichts wurde gespeichert oder versendet.)',
    again: 'Weiteres Projekt einreichen',
  },
}

const en: typeof de = {
  title: 'Project showcase',
  lead: 'What students and young professionals build: robotics, firmware, embedded, hackathon results. To copy, join in and connect.',
  sampleNote: 'All projects are sample entries; teams and links are made up.',
  filter: 'Filter by topic',
  allTags: 'All',
  results: '{n} projects',
  link: 'View project',
  linkNote: '(placeholder link)',
  tags: { robotik: 'Robotics', embedded: 'Embedded', firmware: 'Firmware', hackathon: 'Hackathon', iot: 'IoT', energie: 'Energy', fpga: 'FPGA' },
  form: {
    title: 'Submit a project',
    intro: 'Built something? Show it to the community. One photo and three sentences are enough.',
    name: 'Project name',
    team: 'Team',
    tags: 'Topics',
    text: 'Short description',
    link: 'Link (repo, video, blog)',
    contact: 'Contact email',
    required: 'required',
    submit: 'Submit project',
    done: 'Thanks! The project would now be under review. (Demo: nothing was stored or sent.)',
    again: 'Submit another project',
  },
}

export const projects: Dict<typeof de> = { de, en }
