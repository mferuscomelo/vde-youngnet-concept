import type { Dict } from '.'

const de = {
  audience: { students: 'Studierende', 'young-professionals': 'Young Professionals', all: 'Alle' } as Record<string, string>,
  type: {
    stammtisch: 'Stammtisch', workshop: 'Workshop', 'junges-forum': 'Junges Forum', kongress: 'Kongress / Messe',
    'yp-meetup': 'YP-Meetup', regional: 'Regional-Event', hackathon: 'Hackathon', exkursion: 'Exkursion',
  } as Record<string, string>,
  format: { praesenz: 'Präsenz', online: 'Online', dezentral: 'Dezentral (alle BVs)' } as Record<string, string>,
  goal: { horizont: 'Horizont erweitern', networking: 'Networking', onboarding: 'Onboarding' } as Record<string, string>,
  region: {
    hanse: 'Hanse', 'ost-mitte': 'Ost-Mitte', west: 'West', suedwest: 'Südwest', bayern: 'Bayern', bundesweit: 'Bundesweit / online',
  } as Record<string, string>,
  language: { de: 'Deutsch', en: 'Englisch' } as Record<string, string>,
  status: { published: 'Veröffentlicht', pending: 'Wartet auf Freigabe', changes: 'Änderungen angefragt' } as Record<string, string>,
}

const en: typeof de = {
  audience: { students: 'Students', 'young-professionals': 'Young Professionals', all: 'Everyone' },
  type: {
    stammtisch: 'Meetup', workshop: 'Workshop', 'junges-forum': 'Young Forum', kongress: 'Congress / Trade fair',
    'yp-meetup': 'YP Meetup', regional: 'Regional event', hackathon: 'Hackathon', exkursion: 'Excursion',
  },
  format: { praesenz: 'In person', online: 'Online', dezentral: 'Decentralised (all districts)' },
  goal: { horizont: 'Broaden horizons', networking: 'Networking', onboarding: 'Onboarding' },
  region: { hanse: 'Hanse (North)', 'ost-mitte': 'East-Central', west: 'West', suedwest: 'South-West', bayern: 'Bavaria', bundesweit: 'Nationwide / online' },
  language: { de: 'German', en: 'English' },
  status: { published: 'Published', pending: 'Awaiting approval', changes: 'Changes requested' },
}

export const taxonomy: Dict<typeof de> = { de, en }

export const AUDIENCES = ['students', 'young-professionals', 'all'] as const
export const TYPES = ['stammtisch', 'workshop', 'junges-forum', 'kongress', 'yp-meetup', 'regional', 'hackathon', 'exkursion'] as const
export const FORMATS = ['praesenz', 'online', 'dezentral'] as const
export const GOALS = ['horizont', 'networking', 'onboarding'] as const
/** VDE Young Net regions as used on vde.com, plus nationwide */
export const REGIONS = ['hanse', 'ost-mitte', 'west', 'suedwest', 'bayern', 'bundesweit'] as const
export const FACHGESELLSCHAFTEN = ['ETG', 'ITG', 'GMM', 'GMA', 'DGBMT'] as const
