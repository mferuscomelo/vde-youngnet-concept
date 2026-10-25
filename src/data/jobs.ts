// Listings from partner companies, shown by sector and location rather than by name.
export type Job = {
  id: string
  company: string
  type: 'praktikum' | 'werkstudent' | 'abschlussarbeit' | 'einstieg'
  field: 'energie' | 'embedded' | 'automatisierung' | 'nachrichten' | 'medizin'
  region: string
  city: string
  title_de: string
  title_en: string
  text_de: string
  text_en: string
}

export const JOBS: Job[] = [
  { id: 'j1', company: 'Verteilnetzbetreiber', type: 'praktikum', field: 'energie', region: 'suedwest', city: 'Karlsruhe',
    title_de: 'Praktikum Netzplanung (6 Monate)', title_en: 'Internship grid planning (6 months)',
    text_de: 'Lastflussberechnungen und Auswertung von Messdaten im Verteilnetz.', text_en: 'Load-flow calculations and analysis of distribution grid measurements.' },
  { id: 'j2', company: 'Elektronikhersteller', type: 'werkstudent', field: 'embedded', region: 'bayern', city: 'München',
    title_de: 'Werkstudent:in Firmware-Test', title_en: 'Working student firmware testing',
    text_de: 'Testautomatisierung für Mikrocontroller-Firmware, 12–20 h/Woche.', text_en: 'Test automation for microcontroller firmware, 12–20 h/week.' },
  { id: 'j3', company: 'Antriebstechnik-Mittelständler', type: 'abschlussarbeit', field: 'automatisierung', region: 'west', city: 'Aachen',
    title_de: 'Masterarbeit: Zustands\u00ADüberwachung von Antrieben', title_en: 'Master thesis: condition monitoring of drives',
    text_de: 'Merkmalsextraktion aus Vibrationsdaten, Vergleich klassischer und ML-Verfahren.', text_en: 'Feature extraction from vibration data, comparing classical and ML methods.' },
  { id: 'j4', company: 'Funk- und Radartechnik', type: 'einstieg', field: 'nachrichten', region: 'hanse', city: 'Hamburg',
    title_de: 'Junior-Ingenieur:in HF-Schaltungen', title_en: 'Junior engineer RF circuits',
    text_de: 'Entwurf und Messung von HF-Baugruppen, Einarbeitung im Team.', text_en: 'Design and measurement of RF assemblies, team onboarding.' },
  { id: 'j5', company: 'Medizintechnik-Start-up', type: 'abschlussarbeit', field: 'medizin', region: 'ost-mitte', city: 'Dresden',
    title_de: 'Bachelorarbeit: EKG-Signalverarbeitung', title_en: 'Bachelor thesis: ECG signal processing',
    text_de: 'Filterentwurf und Artefakterkennung für tragbare Sensoren.', text_en: 'Filter design and artefact detection for wearable sensors.' },
  { id: 'j6', company: 'Energieversorger', type: 'einstieg', field: 'energie', region: 'suedwest', city: 'Darmstadt',
    title_de: 'Trainee-Programm Energiesysteme', title_en: 'Graduate programme energy systems',
    text_de: '18 Monate, drei Stationen, Mentoring inklusive.', text_en: '18 months, three rotations, mentoring included.' },
  { id: 'j7', company: 'Robotik-Start-up', type: 'praktikum', field: 'automatisierung', region: 'suedwest', city: 'Stuttgart',
    title_de: 'Praktikum Robotersteuerung', title_en: 'Internship robot control',
    text_de: 'ROS-basierte Bahnplanung für einen Demonstrator.', text_en: 'ROS-based path planning for a demonstrator.' },
  { id: 'j8', company: 'Embedded-Software-Dienstleister', type: 'werkstudent', field: 'embedded', region: 'bundesweit', city: 'Remote',
    title_de: 'Werkstudent:in Embedded Linux (remote)', title_en: 'Working student embedded Linux (remote)',
    text_de: 'Yocto-Builds und Treiberanpassungen, komplett remote.', text_en: 'Yocto builds and driver adaptation, fully remote.' },
]
