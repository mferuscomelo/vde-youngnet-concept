// Directory data taken from vde.com and vde-bayern.de (October 2026): the 28 VDE
// Bezirksvereine with their office contacts, the Hochschulgruppen listed on the Young Net
// region pages and the five Fachgesellschaften. Group-to-Bezirksverein assignments are by
// location. Contacts are offices and roles only, never named individuals.
import { asset } from '../lib/asset'

export type Hsg = {
  id: string
  name: string
  university: string
  city: string // key in lib/places.ts
  region: string // key in taxonomy REGIONS
  bv: string
  url: string
}

export type Bv = {
  id: string
  name: string
  official: string
  region: string
  city: string
  website: string
  address: string
  phone: string
  email: string
}

export type Contact = {
  id: string
  scope: 'region' | 'bv' | 'hsg'
  ref: string // region key, bv id or hsg id
  role_de: string
  role_en: string
  city: string
  email?: string
  phone?: string
  url?: string
}

export const YOUNG_NET_OFFICE = {
  name: 'VDE Young Net Geschäftsstelle',
  address: 'Merianstraße 28, 63069 Offenbach am Main',
  phone: '+49 69 6308-347',
  email: 'youngnet@vde.com',
}

export const PRESS_OFFICE = {
  name: 'VDE Pressestelle',
  address: 'Merianstraße 28, 63069 Offenbach am Main',
  email: 'presse@vde.com',
  distribution: 'https://www.vde.com/de/presse/presseverteiler',
}

export const MEMBER_SERVICE = {
  name: 'VDE Mitgliederservice',
  phone: '+49 69 6308-310',
  email: 'service@vde.com',
}

export const BVS: Bv[] = [
  { id: 'bv-aachen', name: 'VDE Regio Aachen', official: 'VDE Regio Aachen e.V.', region: 'west', city: 'aachen',
    website: 'https://www.vde-regio-aachen.de/de', address: 'Neuenhofstrasse 194, 52078 Aachen (Siemens-Gebäude)', phone: '+49 241 45090151', email: 'info@vde-aachen.de' },
  { id: 'bv-berlin-brandenburg', name: 'VDE Berlin-Brandenburg (ETV)', official: 'Elektrotechnischer Verein (ETV) e.V. – Bezirksverein Berlin-Brandenburg im VDE', region: 'ost-mitte', city: 'berlin',
    website: 'https://www.vde-berlin-brandenburg.de/de', address: 'Bismarckstraße 33, 10625 Berlin', phone: '+49 30 3414566', email: 'kontakt@etv-berlin.com' },
  { id: 'bv-owl', name: 'VDE Ostwestfalen Lippe', official: 'VDE Ostwestfalen-Lippe e.V.', region: 'west', city: 'bielefeld',
    website: 'https://www.vde-ostwestfalen-lippe.de/de', address: 'Postfach 10 29 50, 33529 Bielefeld', phone: '+49 5223 8197136', email: 'gs.vde-owl@vde-online.de' },
  { id: 'bv-braunschweig', name: 'VDE Braunschweig', official: 'VDE Bezirksverein Braunschweig e.V.', region: 'hanse', city: 'braunschweig',
    website: 'https://www.vde-braunschweig.de/de', address: 'Physikalisch-Technische Bundesanstalt (PTB), Bundesallee 100, 38116 Braunschweig', phone: '+49 531 592-3799', email: 'vde-braunschweig@vde-online.de' },
  { id: 'bv-nord-west', name: 'VDE Region Nord-West', official: 'VDE Region Nord-West e.V.', region: 'hanse', city: 'bremen',
    website: 'https://www.vde-nord-west.de/de-nw', address: 'Domsheide 3, 28195 Bremen', phone: '+49 421 3809-910', email: 'info@vde-nord-west.de' },
  { id: 'bv-chemnitz', name: 'VDE Chemnitz', official: 'VDE Bezirksverein Chemnitz e.V.', region: 'ost-mitte', city: 'chemnitz',
    website: 'https://www.vde-chemnitz.de/de', address: 'c/o Solaris Verwaltungs-GmbH, Neefestraße 88, 09116 Chemnitz', phone: '+49 371 3685-900', email: 'vde-chemnitz@vde-online.de' },
  { id: 'bv-lausitz', name: 'VDE Lausitz', official: 'VDE Bezirksverein Lausitz e.V.', region: 'ost-mitte', city: 'cottbus',
    website: 'https://www.vde-lausitz.de/de', address: 'c/o Städtische Werke Spremberg (Lausitz) GmbH, Lustgartenstrasse 4a, 03130 Spremberg', phone: '+49 3563 3907-917', email: 'vde-lausitz@vde-online.de' },
  { id: 'bv-dresden', name: 'VDE Dresden', official: 'VDE Dresden e.V.', region: 'ost-mitte', city: 'dresden',
    website: 'https://www.vde-dresden.de/de', address: 'c/o TU Dresden, Institut für Elektrische Energieversorgung und Hochspannungstechnik, 01062 Dresden (Besucheradresse: Mommsenstraße 12, Toeplerbau Zi. 109, 01069 Dresden)', phone: '+49 351 463-34574', email: 'vde-dresden@vde-online.de' },
  { id: 'bv-duesseldorf', name: 'VDE Düsseldorf', official: 'VDE Bezirk Düsseldorf e.V.', region: 'west', city: 'duesseldorf',
    website: 'https://www.vde-duesseldorf.de/du-de', address: 'c/o Hochschule Düsseldorf, Fachbereich EI, Münsterstraße 156, 40476 Düsseldorf', phone: '+49 211 4351-6941', email: 'service@vde-duesseldorf.de' },
  { id: 'bv-thueringen', name: 'VDE Thüringen', official: 'VDE Bezirksverein Thüringen e.V.', region: 'ost-mitte', city: 'erfurt',
    website: 'https://www.vde-thueringen.de/de', address: 'c/o Stadtwerke Jena Netze GmbH, Rudolstädter Straße 39, 07745 Jena', phone: '+49 3641 688457', email: 'vde-thueringen@vde-online.de' },
  { id: 'bv-rhein-ruhr', name: 'VDE Rhein-Ruhr', official: 'VDE Rhein-Ruhr e.V.', region: 'west', city: 'essen',
    website: 'https://www.vde-rhein-ruhr.de/de', address: 'Hollestraße 1g, 45127 Essen', phone: '+49 201 806890-01', email: 'geschaeftsstelle@vde-rhein-ruhr.de' },
  { id: 'bv-rhein-main', name: 'VDE Rhein-Main', official: 'VDE Rhein-Main e.V.', region: 'suedwest', city: 'frankfurt',
    website: 'https://www.vde-rhein-main.de/de', address: 'Merianstraße 28, 63069 Offenbach am Main', phone: '+49 69 6308-271', email: 'vde-rhein-main@vde-online.de' },
  { id: 'bv-suedbaden', name: 'VDE Südbaden', official: 'VDE Südbaden e.V.', region: 'suedwest', city: 'freiburg',
    website: 'https://www.vde-suedbaden.de/de', address: 'Sulzbergstraße 79, 77933 Lahr', phone: '+49 7821 909300', email: 'vde-suedbaden@vde-online.de' },
  { id: 'bv-region-nord', name: 'VDE Region Nord', official: 'VDE Region Nord e.V.', region: 'hanse', city: 'hamburg',
    website: 'https://www.vde-region-nord.de/de', address: 'Stadtbahnstraße 114, 22391 Hamburg', phone: '+49 4131 9925520', email: 'vde-region-nord@vde-online.de' },
  { id: 'bv-hannover', name: 'VDE Hannover', official: 'VDE Hannover e.V.', region: 'hanse', city: 'hannover',
    website: 'https://www.vde-hannover.de/de', address: 'Hildesheimer Straße 265, 30519 Hannover', phone: '+49 511 342081', email: 'vde-hannover@t-online.de' },
  { id: 'bv-mittelbaden', name: 'VDE Mittelbaden', official: 'VDE Bezirksverein Mittelbaden e.V.', region: 'suedwest', city: 'karlsruhe',
    website: 'https://www.vde-mittelbaden.de/mb-de', address: 'Im Hause der Rudolf Röser AG, Fritz-Erler-Str. 25, 76133 Karlsruhe', phone: '+49 721 556252', email: 'vde-mittelbaden@vde-online.de' },
  { id: 'bv-kassel', name: 'VDE Kassel', official: 'VDE Bezirksverein Kassel e.V.', region: 'west', city: 'kassel',
    website: 'https://www.vde-kassel.de/de', address: 'c/o smartOPS GmbH, Breitscheidstraße 6, 34119 Kassel', phone: '+49 561 3161399', email: 'vde-kassel@vde-online.de' },
  { id: 'bv-koeln', name: 'VDE Köln', official: 'VDE Bezirk Köln e.V.', region: 'west', city: 'koeln',
    website: 'https://www.vde-koeln.de/ko-de', address: 'Im Mediapark 5, 50670 Köln', phone: '+49 170 6159463', email: 'info@vde-koeln.de' },
  { id: 'bv-niederrhein', name: 'VDE Niederrhein', official: 'VDE Niederrhein e.V.', region: 'west', city: 'krefeld',
    website: 'https://www.vde-niederrhein.de/de', address: 'Wegerhofstr. 61, 47877 Willich', phone: '+49 170 6159463', email: 'info@vde-niederrhein.de' },
  { id: 'bv-leipzig-halle', name: 'VDE Leipzig/Halle', official: 'VDE Bezirksverein Leipzig/Halle e.V.', region: 'ost-mitte', city: 'leipzig',
    website: 'https://www.vde-leipzig-halle.de/de', address: 'Mönchereistraße 2, 04416 Markkleeberg', phone: '+49 341 350222-65', email: 'vde-leipzig-halle@vde-online.de' },
  { id: 'bv-magdeburg', name: 'VDE Magdeburg', official: 'VDE-Bezirksverein Magdeburg e.V.', region: 'ost-mitte', city: 'magdeburg',
    website: 'https://www.vde-magdeburg.de/de', address: 'c/o Actemium Energy Projects GmbH, Halberstädter Str. 32, 39112 Magdeburg', phone: '+49 391 61157-11', email: 'vde-magdeburg@vde-online.de' },
  { id: 'bv-kurpfalz', name: 'VDE Kurpfalz', official: 'VDE Bezirk Kurpfalz e.V.', region: 'suedwest', city: 'mannheim',
    website: 'https://www.vde-kurpfalz.de/de', address: 'Julius-Hatry-Strasse 1, 68163 Mannheim', phone: '+49 621 22657', email: 'vde-kurpfalz@vde-online.de' },
  { id: 'bv-bayern', name: 'VDE Bayern', official: 'VDE Bayern e.V.', region: 'bayern', city: 'nuernberg',
    website: 'https://www.vde-bayern.de/de', address: 'Besucheradresse: c/o Technische Hochschule Nürnberg, Wassertorstraße 1, 1. OG, Raum KH.109, Hochspannungshalle, 90489 Nürnberg; Postadresse: c/o Technische Hochschule Georg Simon Ohm, Keßlerplatz 12, 90489 Nürnberg', phone: '+49 911 535320', email: 'info@vde-bayern.de' },
  { id: 'bv-osnabrueck-emsland', name: 'VDE Osnabrück-Emsland', official: 'VDE Osnabrück-Emsland e.V.', region: 'hanse', city: 'osnabrueck',
    website: 'https://www.vde-osnabrueck-emsland.de/de', address: 'c/o HS Osnabrück, Postfach 1940, 49009 Osnabrück', phone: '+49 541 969-3241', email: 'vde-osnabrueck-emsland@vde-online.de' },
  { id: 'bv-saar', name: 'VDE Saar', official: 'VDE Bezirk Saar e.V.', region: 'suedwest', city: 'saarbruecken',
    website: 'https://www.vde-saar.de/de', address: 'c/o Lehrstuhl für Messtechnik, Universität des Saarlandes, Campus A5.1, 66123 Saarbrücken', phone: '+49 681 302-4683', email: 'vde-saar@vde-online.de' },
  { id: 'bv-wuerttemberg', name: 'VDE Württemberg', official: 'VDE Bezirksverein Württemberg e.V.', region: 'suedwest', city: 'stuttgart',
    website: 'https://www.vde-wuerttemberg.de/de', address: 'Bachstraße 22, 73269 Hochdorf', phone: '+49 7153 4359129', email: 'vde-wuerttemberg@vde-online.de' },
  { id: 'bv-trier', name: 'VDE Trier', official: 'VDE Bezirk Trier e.V.', region: 'suedwest', city: 'trier',
    website: 'https://www.vde-trier.de/de', address: 'c/o Hochschule Trier, Schneidershof, 54293 Trier', phone: '+49 651 8103-288', email: 'vde-trier@vde-online.de' },
  { id: 'bv-bergischland-suedwestfalen', name: 'VDE Bergisch Land-Südwestfalen', official: 'VDE Bezirksverein Bergisch Land-Südwestfalen e.V.', region: 'west', city: 'wuppertal',
    website: 'https://www.vde-bergischland-suedwestfalen.de/de', address: 'Geschäftsstelle c/o duotec GmbH, Humboldtstraße 8a, 58553 Halver', phone: '+49 2353 13906170', email: 'vde-bergischland-suedwestfalen@vde-online.de' },
]

export const HSGS: Hsg[] = [
  { id: 'hsg-etv-darmstadt', name: 'VDE Hochschulgruppe ETV Darmstadt', university: 'TU Darmstadt (ETV)', city: 'darmstadt', region: 'suedwest', bv: 'bv-rhein-main', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/hsg-etv-darmstadt' },
  { id: 'hsg-hs-kaiserslautern', name: 'VDE Hochschulgruppe der Hochschule Kaiserslautern', university: 'Hochschule Kaiserslautern', city: 'kaiserslautern', region: 'suedwest', bv: 'bv-kurpfalz', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/hsg-kaiserslautern' },
  { id: 'hsg-etk-kaiserslautern', name: 'VDE Hochschulgruppe ETK Kaiserslautern', university: 'RPTU Kaiserslautern (ETK)', city: 'kaiserslautern', region: 'suedwest', bv: 'bv-kurpfalz', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/hsg-etk-kaiserslautern' },
  { id: 'hsg-kit', name: 'VDE Hochschulgruppe KIT Karlsruhe', university: 'Karlsruher Institut für Technologie', city: 'karlsruhe', region: 'suedwest', bv: 'bv-mittelbaden', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/hsg-kit-karlsruhe' },
  { id: 'hsg-konstanz', name: 'VDE Hochschulgruppe Konstanz', university: 'HTWG Konstanz', city: 'konstanz', region: 'suedwest', bv: 'bv-suedbaden', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/hsg-konstanz' },
  { id: 'hsg-ulm', name: 'VDE Hochschulgruppe Ulm', university: 'Universität Ulm / THU', city: 'ulm', region: 'suedwest', bv: 'bv-wuerttemberg', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/vde-hochschulgruppe-ulm' },
  { id: 'hsg-saarland', name: 'VDE Hochschulgruppe Uni Saarland', university: 'Universität des Saarlandes', city: 'saarbruecken', region: 'suedwest', bv: 'bv-saar', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/hsg-uni-saarland' },
  { id: 'hsg-trier', name: 'VDE Hochschulgruppe Trier', university: 'Hochschule Trier', city: 'trier', region: 'suedwest', bv: 'bv-trier', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/hsg-trier' },
  { id: 'hsg-offenburg', name: 'VDE Hochschulgruppe Offenburg', university: 'Hochschule Offenburg', city: 'offenburg', region: 'suedwest', bv: 'bv-suedbaden', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-suedwest/vde-hochschulgruppe-offenburg' },
  { id: 'hsg-btu-cottbus', name: 'VDE Hochschulgruppe BTU Cottbus', university: 'BTU Cottbus-Senftenberg', city: 'cottbus', region: 'ost-mitte', bv: 'bv-lausitz', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-ost-mitte/hsg-btu-cottbus' },
  { id: 'hsg-htw-dresden', name: 'VDE Hochschulgruppe an der HTW Dresden', university: 'HTW Dresden', city: 'dresden', region: 'ost-mitte', bv: 'bv-dresden', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-ost-mitte/hsg-htw-dresden' },
  { id: 'hsg-ilmenau', name: 'VDE Hochschulgruppe Ilmenau', university: 'TU Ilmenau', city: 'ilmenau', region: 'ost-mitte', bv: 'bv-thueringen', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-ost-mitte/vde-hochschulgruppe-ilmenau' },
  { id: 'hsg-htwk-leipzig', name: 'VDE Hochschulgruppe HTWK Leipzig', university: 'HTWK Leipzig', city: 'leipzig', region: 'ost-mitte', bv: 'bv-leipzig-halle', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-ost-mitte/vde-hochschulgruppe-htwk-leipzig' },
  { id: 'hsg-merseburg', name: 'VDE Hochschulgruppe Merseburg', university: 'Hochschule Merseburg', city: 'merseburg', region: 'ost-mitte', bv: 'bv-leipzig-halle', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-ost-mitte/hsg-merseburg' },
  { id: 'hsg-zwickau', name: 'VDE Hochschulgruppe Zwickau', university: 'Westsächsische Hochschule Zwickau', city: 'zwickau', region: 'ost-mitte', bv: 'bv-chemnitz', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-ost-mitte/hsg-zwickau' },
  { id: 'hsg-aachen', name: 'VDE Hochschulgruppe Aachen', university: 'RWTH Aachen / FH Aachen', city: 'aachen', region: 'west', bv: 'bv-aachen', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/vde-hochschulgruppe-aachen' },
  { id: 'hsg-thga-bochum', name: 'VDE Hochschulgruppe THGA Bochum', university: 'Technische Hochschule Georg Agricola', city: 'bochum', region: 'west', bv: 'bv-rhein-ruhr', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/v-hochschulgruppe-thga-bochum' },
  { id: 'hsg-rub', name: 'VDE Hochschulgruppe Ruhr Uni Bochum', university: 'Ruhr-Universität Bochum', city: 'bochum', region: 'west', bv: 'bv-rhein-ruhr', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/vde-hochschulgruppe-ruhr-uni-bochum' },
  { id: 'hsg-uni-kassel', name: 'VDE Hochschulgruppe Uni Kassel', university: 'Universität Kassel', city: 'kassel', region: 'west', bv: 'bv-kassel', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/vde-hochschulgruppe-uni-kassel' },
  { id: 'hsg-koeln', name: 'VDE Hochschulgruppe Köln', university: 'TH Köln', city: 'koeln', region: 'west', bv: 'bv-koeln', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/hsg-koeln' },
  { id: 'hsg-krefeld', name: 'VDE Hochschulgruppe Niederrhein - Krefeld', university: 'Hochschule Niederrhein', city: 'krefeld', region: 'west', bv: 'bv-niederrhein', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/hsg-krefeld' },
  { id: 'hsg-muenster-steinfurt', name: 'VDE Hochschulgruppe Münster Steinfurt', university: 'FH Münster (Steinfurt)', city: 'steinfurt', region: 'west', bv: 'bv-owl', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/vde-hochschulgruppe-muenster-steinfurt' },
  { id: 'hsg-suedwestfalen', name: 'VDE Hochschulgruppe Südwestfalen Hagen und Soest', university: 'FH Südwestfalen (Hagen, Soest)', city: 'hagen', region: 'west', bv: 'bv-bergischland-suedwestfalen', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/hsg-swf-soest' },
  { id: 'hsg-wuppertal', name: 'VDE Hochschulgruppe Wuppertal', university: 'Bergische Universität Wuppertal', city: 'wuppertal', region: 'west', bv: 'bv-bergischland-suedwestfalen', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-west/vde-hochschulgruppe-wuppertal' },
  { id: 'hsg-hs-bremen', name: 'VDE Hochschulgruppe HS Bremen', university: 'Hochschule Bremen', city: 'bremen', region: 'hanse', bv: 'bv-nord-west', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-hanse/hsg-hs-bremen' },
  { id: 'hsg-tuhh', name: 'VDE Hochschulgruppe TU Hamburg', university: 'TU Hamburg', city: 'hamburg', region: 'hanse', bv: 'bv-region-nord', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-hanse/hsg-tu-hamburg' },
  { id: 'hsg-jade', name: 'VDE Hochschulgruppe Jade Wilhelmshaven', university: 'Jade Hochschule Wilhelmshaven', city: 'wilhelmshaven', region: 'hanse', bv: 'bv-nord-west', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-hanse/hsg-jade-wilhelmshaven' },
  { id: 'hsg-osnabrueck', name: 'VDE Hochschulgruppe Osnabrück', university: 'Hochschule Osnabrück', city: 'osnabrueck', region: 'hanse', bv: 'bv-osnabrueck-emsland', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-hanse/hsg-osnabrueck' },
  { id: 'hsg-ostfalia', name: 'VDE Hochschulgruppe Ostfalia Wolfenbüttel', university: 'Ostfalia Hochschule, Wolfenbüttel', city: 'wolfenbuettel', region: 'hanse', bv: 'bv-braunschweig', url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/vde-hochschulgruppen/hsg-nach-regionen/hsg-hanse/hsg-wolfenbuettel' },
  { id: 'hsg-hs-augsburg', name: 'VDE Hochschulgruppe HS Augsburg', university: 'Hochschule Augsburg', city: 'augsburg', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/hochschulgruppe-augsburg-aktuell' },
  { id: 'hsg-uni-bayreuth', name: 'VDE Hochschulgruppe Universität Bayreuth', university: 'Universität Bayreuth', city: 'bayreuth', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/vdeh-hochschulgruppe-bayreuth' },
  { id: 'hsg-fau', name: 'VDE Hochschulgruppe FAU Erlangen - ETG-Kurzschluss e.V.', university: 'FAU Erlangen-Nürnberg (ETG-Kurzschluss e.V.)', city: 'erlangen', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/hochschulgruppe-erlangen' },
  { id: 'hsg-thi', name: 'VDE Hochschulgruppe TH Ingolstadt', university: 'TH Ingolstadt', city: 'ingolstadt', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/vde-bayern-hochschulgruppe-th-ingolstadt' },
  { id: 'hsg-hs-landshut', name: 'VDE Hochschulgruppe HS Landshut', university: 'Hochschule Landshut', city: 'landshut', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/hochschulgruppe-landshut' },
  { id: 'hsg-hm', name: 'VDE Hochschulgruppe HS München', university: 'Hochschule München', city: 'muenchen', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/vde-bayern-hochschulgruppe-hs-muenchen' },
  { id: 'hsg-tum', name: 'VDE Hochschulgruppe TU München', university: 'TU München', city: 'muenchen', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/hochschulgruppe-muenchen' },
  { id: 'hsg-oth-regensburg', name: 'VDE Hochschulgruppe OTH Regensburg', university: 'OTH Regensburg', city: 'regensburg', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/hsg-regensburg' },
  { id: 'hsg-thws', name: 'VDE Hochschulgruppe TH Würzburg-Schweinfurt', university: 'TH Würzburg-Schweinfurt', city: 'schweinfurt', region: 'bayern', bv: 'bv-bayern', url: 'https://www.vde-bayern.de/de/vde-bayern-young-net/studium/hsg-wuerzburg-schweinfurt' },
]

const REGION_CITY: Record<string, string> = { hanse: 'hamburg', 'ost-mitte': 'leipzig', west: 'essen', suedwest: 'karlsruhe', bayern: 'nuernberg' }

export const CONTACTS: Contact[] = [
  ...Object.entries(REGION_CITY).map(([r, city]): Contact => ({
    id: `c-r-${r}`, scope: 'region', ref: r, role_de: 'Regionalkoordination VDE Young Net', role_en: 'VDE Young Net regional coordination',
    city, email: YOUNG_NET_OFFICE.email, phone: YOUNG_NET_OFFICE.phone,
  })),
  ...BVS.map((b): Contact => ({ id: `c-${b.id}`, scope: 'bv', ref: b.id, role_de: 'Geschäftsstelle', role_en: 'Office', city: b.city, email: b.email, phone: b.phone, url: b.website })),
  ...HSGS.map((h): Contact => ({ id: `c-${h.id}`, scope: 'hsg', ref: h.id, role_de: 'Vorstand der Hochschulgruppe', role_en: 'Student group board', city: h.city, url: h.url })),
]

export type Fg = {
  key: 'ETG' | 'ITG' | 'GMM' | 'GMA' | 'DGBMT'
  name_de: string
  name_en: string
  url: string
  scope_de: string
  scope_en: string
  young_de: string
  young_en: string
  young_url: string | null
  img: string
  img_alt_de: string
  img_alt_en: string
}

export const FGS: Fg[] = [
  { key: 'ETG', name_de: 'Energietechnische Gesellschaft im VDE (VDE ETG)', name_en: 'VDE Power Engineering Society', url: 'https://www.vde.com/de/etg',
    scope_de: 'Die Energietechnische Gesellschaft im VDE (VDE ETG) bündelt im VDE mit über 12.000 Mitgliedern die Fachkompetenz der Energietechnik von der Erzeugung, Übertragung, Verteilung bis hin zu den vielfältigen Anwendungsfeldern.',
    scope_en: 'The VDE Power Engineering Society (VDE ETG) brings together the power engineering expertise of more than 12,000 members, from generation, transmission and distribution to the many fields of application.',
    young_de: 'Junges Forum ETG: Am Vortag zum ETG-Kongress treffen sich Studierende und Young Professionals der Energietechnik.', young_en: 'ETG Young Forum: students and young professionals in power engineering meet the day before the ETG Congress.', young_url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/fachliche-netzwerke/junge-etg',
    img: asset('images/vde/etg-junges-forum.jpg'), img_alt_de: 'Teilnehmende im Gespräch beim Jungen Forum ETG', img_alt_en: 'Participants talking at the ETG Young Forum' },
  { key: 'ITG', name_de: 'Informationstechnische Gesellschaft im VDE (ITG)', name_en: 'VDE Information Technology Society', url: 'https://www.vde.com/de/itg',
    scope_de: 'Die Informationstechnische Gesellschaft (ITG) im VDE e.V. ist die nationale Vereinigung aller auf dem Gebiet der Informationstechnik Tätigen in Wirtschaft, Verwaltung, Lehre und Forschung und Wissenschaft.',
    scope_en: 'The Information Technology Society (ITG) within VDE is the national association of everyone working in information technology in industry, administration, teaching, research and science.',
    young_de: 'Nachwuchsnetzwerk der VDE ITG: der Zusammenschluss junger Elektrotechniker:innen mit Interesse für Informationstechnik – mit dem Jungen Forum ITG zur GeMiC.', young_en: 'VDE ITG young network: young electrical engineers interested in information technology – with the ITG Young Forum at GeMiC.', young_url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/fachliche-netzwerke/junge-itg',
    img: asset('images/vde/itg-gemic.jpg'), img_alt_de: 'Gruppenfoto des Jungen Forums ITG zur GeMiC 2026 mit VDE-Banner', img_alt_en: 'Group photo of the ITG Young Forum at GeMiC 2026 with a VDE banner' },
  { key: 'GMM', name_de: 'VDE/VDI-Gesellschaft Mikroelektronik, Mikrosystem- und Feinwerktechnik (GMM)', name_en: 'VDE/VDI Society for Microelectronics, Microsystems and Precision Engineering', url: 'https://www.vde.com/de/gmm',
    scope_de: 'Die GMM (Gesellschaft Mikroelektronik, Mikrosystem- und Feinwerktechnik) ist eine gemeinsame Fachgesellschaft von VDE und VDI, die sich mit der Förderung und Weiterentwicklung von Mikroelektronik, Mikrosystemtechnik und Nanotechnologie beschäftigt.',
    scope_en: 'GMM is a joint society of VDE and VDI that promotes and advances microelectronics, microsystems technology and nanotechnology.',
    young_de: 'Junge GMM: der Zusammenschluss junger Elektrotechniker:innen mit Interesse für Mikrosystemtechnik.', young_en: 'Young GMM: young electrical engineers with an interest in microsystems technology.', young_url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/fachliche-netzwerke/junge-gmm',
    img: asset('images/vde/gmm-wafer.jpg'), img_alt_de: 'Silizium-Wafer in einer Prüfanlage', img_alt_en: 'Silicon wafer in an inspection system' },
  { key: 'GMA', name_de: 'VDI/VDE-Gesellschaft Mess- und Automatisierungstechnik (GMA)', name_en: 'VDI/VDE Society Measurement and Automatic Control', url: 'https://www.vdi.de/technik/fachthemen/mess-und-automatisierungstechnik/',
    scope_de: 'In der VDI/VDE-GMA vernetzen VDI und VDE Fachleute aus Messtechnik und Automatisierung – durch Richtlinien, in Fachausschüssen, und auf Kongressen.',
    scope_en: 'In the VDI/VDE-GMA, VDI and VDE connect experts in measurement and automation – through guidelines, technical committees and congresses.',
    young_de: 'Ein eigenes Nachwuchsformat ist derzeit nicht ausgeschrieben; Fachausschüsse und Kongresse stehen jungen Mitgliedern offen.', young_en: 'There is currently no dedicated early-career format; technical committees and congresses are open to young members.', young_url: null,
    img: asset('images/vde/gma-robotik.jpg'), img_alt_de: 'Ingenieur:innen besprechen sich an einem Industrieroboter', img_alt_en: 'Engineers in discussion next to an industrial robot' },
  { key: 'DGBMT', name_de: 'Deutsche Gesellschaft für Biomedizinische Technik im VDE (VDE DGBMT)', name_en: 'German Society for Biomedical Engineering within VDE', url: 'https://www.vde.com/de/dgbmt',
    scope_de: 'Die Deutsche Gesellschaft für Biomedizinische Technik im VDE (VDE DGBMT) ist die wissenschaftlich-technische Fachgesellschaft der Medizintechnik in Deutschland.',
    scope_en: 'The German Society for Biomedical Engineering within VDE (VDE DGBMT) is the scientific and technical society for medical technology in Germany.',
    young_de: 'Junges Forum BMT (Young Scientists): am Vortag der BMT-Jahrestagung.', young_en: 'BMT Young Forum (Young Scientists): the day before the annual BMT conference.', young_url: 'https://www.vde.com/de/vde-youngnet/fuer-studierende/fachliche-netzwerke/junge-dgbmt',
    img: asset('images/vde/hero-bmt.jpg'), img_alt_de: 'Gesprächsrunde beim Jungen Forum BMT 2025', img_alt_en: 'Discussion circle at the BMT Young Forum 2025' },
]
