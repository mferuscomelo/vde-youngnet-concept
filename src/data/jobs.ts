// Mock listings from fictional companies only (sample data).
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
  { id: 'j1', company: 'Beispiel GmbH', type: 'praktikum', field: 'energie', region: 'suedwest', city: 'Karlsruhe',
    title_de: 'Praktikum Netzplanung (6 Monate)', title_en: 'Internship grid planning (6 months)',
    text_de: 'Lastflussberechnungen und Auswertung von Messdaten im Verteilnetz.', text_en: 'Load-flow calculations and analysis of distribution grid measurements.' },
  { id: 'j2', company: 'Muster Elektronik AG', type: 'werkstudent', field: 'embedded', region: 'sued', city: 'München',
    title_de: 'Werkstudent:in Firmware-Test', title_en: 'Working student firmware testing',
    text_de: 'Testautomatisierung für Mikrocontroller-Firmware, 12–20 h/Woche.', text_en: 'Test automation for microcontroller firmware, 12–20 h/week.' },
  { id: 'j3', company: 'Fiktiv Automation KG', type: 'abschlussarbeit', field: 'automatisierung', region: 'west', city: 'Aachen',
    title_de: 'Masterarbeit: Zustandsüberwachung von Antrieben', title_en: 'Master thesis: condition monitoring of drives',
    text_de: 'Merkmalsextraktion aus Vibrationsdaten, Vergleich klassischer und ML-Verfahren.', text_en: 'Feature extraction from vibration data, comparing classical and ML methods.' },
  { id: 'j4', company: 'Platzhalter Funk GmbH', type: 'einstieg', field: 'nachrichten', region: 'nord', city: 'Hamburg',
    title_de: 'Junior-Ingenieur:in HF-Schaltungen', title_en: 'Junior engineer RF circuits',
    text_de: 'Entwurf und Messung von HF-Baugruppen, Einarbeitung im Team.', text_en: 'Design and measurement of RF assemblies, team onboarding.' },
  { id: 'j5', company: 'Muster Medizintechnik GmbH', type: 'abschlussarbeit', field: 'medizin', region: 'ost', city: 'Dresden',
    title_de: 'Bachelorarbeit: EKG-Signalverarbeitung', title_en: 'Bachelor thesis: ECG signal processing',
    text_de: 'Filterentwurf und Artefakterkennung für tragbare Sensoren.', text_en: 'Filter design and artefact detection for wearable sensors.' },
  { id: 'j6', company: 'Beispiel Energie AG', type: 'einstieg', field: 'energie', region: 'mitte', city: 'Darmstadt',
    title_de: 'Trainee-Programm Energiesysteme', title_en: 'Graduate programme energy systems',
    text_de: '18 Monate, drei Stationen, Mentoring inklusive.', text_en: '18 months, three rotations, mentoring included.' },
  { id: 'j7', company: 'Muster Robotics UG', type: 'praktikum', field: 'automatisierung', region: 'suedwest', city: 'Stuttgart',
    title_de: 'Praktikum Robotersteuerung', title_en: 'Internship robot control',
    text_de: 'ROS-basierte Bahnplanung für einen Demonstrator.', text_en: 'ROS-based path planning for a demonstrator.' },
  { id: 'j8', company: 'Fiktiv Systems GmbH', type: 'werkstudent', field: 'embedded', region: 'bundesweit', city: 'Remote',
    title_de: 'Werkstudent:in Embedded Linux (remote)', title_en: 'Working student embedded Linux (remote)',
    text_de: 'Yocto-Builds und Treiberanpassungen, komplett remote.', text_en: 'Yocto builds and driver adaptation, fully remote.' },
]
