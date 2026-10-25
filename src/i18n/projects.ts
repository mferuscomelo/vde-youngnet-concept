import type { Dict } from '.'

const de = {
  title: 'Projekt-Showcase',
  lead: 'Was Studierende und Young Professionals bauen: Robotik, Firmware, Embedded, Hackathon-Ergebnisse. Zum Nachmachen, Mitmachen und Kontakte knüpfen.',
  filter: 'Nach Thema filtern',
  allTags: 'Alle',
  results: '{n} Projekte',
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
    done: 'Danke! Dein Projekt ist eingereicht und erscheint nach kurzer Prüfung im Showcase.',
    again: 'Weiteres Projekt einreichen',
  },
}

const en: typeof de = {
  title: 'Project showcase',
  lead: 'What students and young professionals build: robotics, firmware, embedded, hackathon results. To copy, join in and connect.',
  filter: 'Filter by topic',
  allTags: 'All',
  results: '{n} projects',
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
    done: 'Thank you! Your project has been submitted and will appear in the showcase after a short review.',
    again: 'Submit another project',
  },
}

export const projects: Dict<typeof de> = { de, en }
