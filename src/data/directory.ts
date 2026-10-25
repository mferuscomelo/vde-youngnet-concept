// Directory data for the prototype. EVERYTHING here is a placeholder: no real
// Bezirksvereine, Hochschulgruppen or people. Replace with data sourced from
// vde.com (TODO) before any real use.

export type HsgStatus = 'aktiv' | 'sucht' | 'ruhend'

export type Hsg = {
  id: string
  name: string
  university: string
  city: string // key in lib/places.ts
  bv: string
  status: HsgStatus
}

export type Bv = {
  id: string
  name: string
  region: string // key in taxonomy REGIONS
  city: string
  website: null // TODO: aus vde.com übernehmen
}

export type Contact = {
  id: string
  scope: 'region' | 'bv' | 'hsg'
  ref: string // region key, bv id or hsg id
  role_de: string
  role_en: string
  city: string
}

export const BVS: Bv[] = [
  { id: 'bv-p-no', name: 'Bezirksverein Nord (Platzhalter)', region: 'nord', city: 'hamburg', website: null },
  { id: 'bv-p-os', name: 'Bezirksverein Ost (Platzhalter)', region: 'ost', city: 'dresden', website: null },
  { id: 'bv-p-be', name: 'Bezirksverein Ost II (Platzhalter)', region: 'ost', city: 'berlin', website: null },
  { id: 'bv-p-we', name: 'Bezirksverein West (Platzhalter)', region: 'west', city: 'koeln', website: null },
  { id: 'bv-p-mi', name: 'Bezirksverein Mitte (Platzhalter)', region: 'mitte', city: 'darmstadt', website: null },
  { id: 'bv-p-sw', name: 'Bezirksverein Südwest (Platzhalter)', region: 'suedwest', city: 'karlsruhe', website: null },
  { id: 'bv-p-su', name: 'Bezirksverein Süd (Platzhalter)', region: 'sued', city: 'muenchen', website: null },
]

export const HSGS: Hsg[] = [
  { id: 'hsg-a', name: 'Hochschulgruppe A (Platzhalter)', university: 'Hochschule A (Platzhalter)', city: 'karlsruhe', bv: 'bv-p-sw', status: 'aktiv' },
  { id: 'hsg-b', name: 'Hochschulgruppe B (Platzhalter)', university: 'Hochschule B (Platzhalter)', city: 'darmstadt', bv: 'bv-p-mi', status: 'aktiv' },
  { id: 'hsg-c', name: 'Hochschulgruppe C (Platzhalter)', university: 'Hochschule C (Platzhalter)', city: 'dresden', bv: 'bv-p-os', status: 'sucht' },
  { id: 'hsg-d', name: 'Hochschulgruppe D (Platzhalter)', university: 'Hochschule D (Platzhalter)', city: 'aachen', bv: 'bv-p-we', status: 'aktiv' },
  { id: 'hsg-e', name: 'Hochschulgruppe E (Platzhalter)', university: 'Hochschule E (Platzhalter)', city: 'stuttgart', bv: 'bv-p-sw', status: 'sucht' },
  { id: 'hsg-f', name: 'Hochschulgruppe F (Platzhalter)', university: 'Hochschule F (Platzhalter)', city: 'hannover', bv: 'bv-p-no', status: 'ruhend' },
  { id: 'hsg-g', name: 'Hochschulgruppe G (Platzhalter)', university: 'Hochschule G (Platzhalter)', city: 'ilmenau', bv: 'bv-p-os', status: 'ruhend' },
  { id: 'hsg-h', name: 'Hochschulgruppe H (Platzhalter)', university: 'Hochschule H (Platzhalter)', city: 'muenchen', bv: 'bv-p-su', status: 'sucht' },
  { id: 'hsg-i', name: 'Hochschulgruppe I (Platzhalter)', university: 'Hochschule I (Platzhalter)', city: 'bremen', bv: 'bv-p-no', status: 'ruhend' },
  { id: 'hsg-j', name: 'Hochschulgruppe J (Platzhalter)', university: 'Hochschule J (Platzhalter)', city: 'berlin', bv: 'bv-p-be', status: 'aktiv' },
]

export const CONTACTS: Contact[] = [
  ...['nord', 'ost', 'west', 'mitte', 'suedwest', 'sued'].map((r, i): Contact => ({
    id: `c-r-${r}`, scope: 'region', ref: r, role_de: 'Regionale Ansprechperson YoungNet', role_en: 'Regional YoungNet contact',
    city: ['hamburg', 'leipzig', 'dortmund', 'frankfurt', 'stuttgart', 'nuernberg'][i],
  })),
  ...BVS.map((b): Contact => ({ id: `c-${b.id}`, scope: 'bv', ref: b.id, role_de: 'YoungNet-Sprecher:in im BV', role_en: 'YoungNet speaker in the district', city: b.city })),
  ...HSGS.map((h): Contact => ({ id: `c-${h.id}`, scope: 'hsg', ref: h.id, role_de: 'Leitung Hochschulgruppe', role_en: 'Student group lead', city: h.city })),
]

export type Fg = {
  key: 'ETG' | 'ITG' | 'GMM' | 'GMA' | 'DGBMT'
  name_de: string
  name_en: string
  scope_de: string
  scope_en: string
  forum_de: string
  forum_en: string
}

// Names are well known but must be verified on vde.com before shipping (TODO shown in UI).
export const FGS: Fg[] = [
  { key: 'ETG', name_de: 'Energietechnische Gesellschaft', name_en: 'Power Engineering Society',
    scope_de: 'Energieerzeugung, -übertragung und -verteilung, Netze, Antriebe.', scope_en: 'Power generation, transmission and distribution, grids, drives.',
    forum_de: 'Junges Forum ETG – am Vortag des ETG-Kongresses.', forum_en: 'ETG Young Forum – the day before the ETG Congress.' },
  { key: 'ITG', name_de: 'Informationstechnische Gesellschaft', name_en: 'Information Technology Society',
    scope_de: 'Kommunikationstechnik, Hochfrequenz, Signalverarbeitung, Netze.', scope_en: 'Communications, RF and microwave, signal processing, networks.',
    forum_de: 'Junges Forum ITG – u. a. im Rahmen der GeMiC.', forum_en: 'ITG Young Forum – e.g. alongside GeMiC.' },
  { key: 'GMM', name_de: 'VDE/VDI-Gesellschaft Mikroelektronik, Mikrosystem- und Feinwerktechnik', name_en: 'VDE/VDI Society Microelectronics, Microsystems and Precision Engineering',
    scope_de: 'Halbleiter, Mikrosysteme, Aufbau- und Verbindungstechnik.', scope_en: 'Semiconductors, microsystems, packaging and interconnects.',
    forum_de: 'Nachwuchsformat: wird ergänzt.', forum_en: 'Early-career format: to be added.' },
  { key: 'GMA', name_de: 'VDI/VDE-Gesellschaft Mess- und Automatisierungstechnik', name_en: 'VDI/VDE Society Measurement and Automatic Control',
    scope_de: 'Messtechnik, Regelungs- und Automatisierungstechnik.', scope_en: 'Measurement, control engineering and automation.',
    forum_de: 'Nachwuchsformat: wird ergänzt.', forum_en: 'Early-career format: to be added.' },
  { key: 'DGBMT', name_de: 'Deutsche Gesellschaft für Biomedizinische Technik', name_en: 'German Society for Biomedical Engineering',
    scope_de: 'Medizintechnik, Biomedizinische Technik, Medizininformatik.', scope_en: 'Medical technology, biomedical engineering, medical informatics.',
    forum_de: 'Junges Forum BMT – am Vortag der BMT-Jahrestagung.', forum_en: 'BMT Young Forum – the day before the BMT annual conference.' },
]
