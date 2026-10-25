import seed from '../data/events.json'
import type { Lang } from '../i18n'
import { PLACES, distanceKm } from './places'

export type Audience = 'students' | 'young-professionals' | 'all'
export type Status = 'published' | 'pending' | 'changes'

export type Recap = {
  participants: number
  photos: number
  text_de: string
  text_en: string
  quote_de: string
  quote_en: string
}

export type HubEvent = {
  id: string
  slug: string
  title_de: string
  title_en: string
  description_de: string
  description_en: string
  start: string // YYYY-MM-DD
  end: string // YYYY-MM-DD, inclusive
  format: string
  type: string
  goals: string[]
  audience: Audience
  location: string | null // place key, 'online', 'alle-bvs' or null = "Ort folgt"
  region: string | null
  bv: string | null
  fachgesellschaft: string | null
  organizer: string
  price_member: number | null
  price_nonmember: number | null
  price_note_de?: string
  price_note_en?: string
  /** Free member tickets from VDE's limited contingent (trade fairs, congresses) */
  tickets_url?: string
  /** Practical note, e.g. "Venue and time to be announced" */
  note_de?: string
  note_en?: string
  /** Official event page */
  link?: { url: string; label_de: string; label_en: string }
  language: string
  status: Status
  source: 'notion' | 'hub' | 'submitted'
  cover: number
  added: string
  recap?: Recap
}

export const SEED_EVENTS = seed as HubEvent[]

export function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function isPast(e: HubEvent, today = todayISO()): boolean {
  return e.end < today
}

export function title(e: HubEvent, lang: Lang): string {
  return lang === 'en' ? e.title_en : e.title_de
}

export function description(e: HubEvent, lang: Lang): string {
  return lang === 'en' ? e.description_en : e.description_de
}

export function coords(e: HubEvent): { lat: number; lng: number } | null {
  return e.location ? PLACES[e.location] ?? null : null
}

function parseISO(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** VDE date style: "27.10.2026" and "26.10.2026 - 30.10.2026" (English: "27 Oct 2026"). */
export function formatDateRange(e: Pick<HubEvent, 'start' | 'end'>, lang: Lang): string {
  const fmtDate = (d: Date) =>
    lang === 'de'
      ? d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const s = fmtDate(parseISO(e.start))
  return e.end === e.start ? s : `${s} - ${fmtDate(parseISO(e.end))}`
}

export function formatPrice(n: number | null, lang: Lang): string | null {
  if (n == null) return null
  if (n === 0) return lang === 'de' ? 'kostenlos' : 'free'
  return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function isFree(e: HubEvent): boolean | null {
  if (e.price_nonmember == null) return null
  return e.price_nonmember === 0
}

// ---- Filtering (state lives in the URL query) ----

export type Filters = {
  q: string
  aud: string[]
  type: string[]
  format: string[]
  goal: string[]
  region: string[]
  fg: string[]
  from: string
  to: string
  price: '' | 'free' | 'paid'
  lang: string[]
  near: boolean
  sort: 'date' | 'added' | 'distance'
}

const LIST_KEYS = ['aud', 'type', 'format', 'goal', 'region', 'fg', 'lang'] as const

export function filtersFromParams(p: URLSearchParams): Filters {
  const list = (k: string) => (p.get(k) ?? '').split(',').filter(Boolean)
  const sort = p.get('sort')
  const price = p.get('price')
  return {
    q: p.get('q') ?? '',
    aud: list('aud'),
    type: list('type'),
    format: list('format'),
    goal: list('goal'),
    region: list('region'),
    fg: list('fg'),
    lang: list('lang'),
    from: p.get('from') ?? '',
    to: p.get('to') ?? '',
    price: price === 'free' || price === 'paid' ? price : '',
    near: p.get('near') === '1',
    sort: sort === 'added' || sort === 'distance' ? sort : 'date',
  }
}

/** Writes filter state into params, keeping unrelated params (view, tab). */
export function applyFilters(p: URLSearchParams, f: Partial<Filters>): URLSearchParams {
  const next = new URLSearchParams(p)
  for (const [k, v] of Object.entries(f)) {
    const empty = v === '' || v === false || (Array.isArray(v) && v.length === 0) || (k === 'sort' && v === 'date')
    if (empty) next.delete(k)
    else if (Array.isArray(v)) next.set(k, v.join(','))
    else if (typeof v === 'boolean') next.set(k, '1')
    else next.set(k, String(v))
  }
  return next
}

export function activeFilterCount(f: Filters): number {
  return LIST_KEYS.reduce((n, k) => n + f[k].length, 0) + (f.from ? 1 : 0) + (f.to ? 1 : 0) + (f.price ? 1 : 0) + (f.near ? 1 : 0)
}

function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function matches(e: HubEvent, f: Filters, origin: { lat: number; lng: number } | null, nearKm = 150): boolean {
  if (f.q) {
    const hay = norm([e.title_de, e.title_en, e.description_de, e.description_en, e.location ? PLACES[e.location]?.label ?? e.location : '', e.organizer].join(' '))
    if (!norm(f.q).split(/\s+/).every((t) => hay.includes(t))) return false
  }
  // "Alle" events are relevant to every audience filter
  if (f.aud.length && !(f.aud.includes(e.audience) || e.audience === 'all')) return false
  if (f.type.length && !f.type.includes(e.type)) return false
  if (f.format.length && !f.format.includes(e.format)) return false
  if (f.goal.length && !e.goals.some((g) => f.goal.includes(g))) return false
  if (f.region.length && !(e.region && f.region.includes(e.region)) && !(e.bv && f.region.includes(e.bv))) return false
  if (f.fg.length && !(e.fachgesellschaft && f.fg.includes(e.fachgesellschaft))) return false
  if (f.lang.length && !f.lang.includes(e.language)) return false
  if (f.from && e.end < f.from) return false
  if (f.to && e.start > f.to) return false
  if (f.price === 'free' && isFree(e) !== true) return false
  if (f.price === 'paid' && isFree(e) !== false) return false
  if (f.near) {
    const c = coords(e)
    if (!origin || !c || distanceKm(origin, c) > nearKm) return false
  }
  return true
}

export function sortEvents(list: HubEvent[], sort: Filters['sort'], origin: { lat: number; lng: number } | null, past = false): HubEvent[] {
  const byDate = (a: HubEvent, b: HubEvent) => (past ? b.start.localeCompare(a.start) : a.start.localeCompare(b.start))
  const copy = [...list]
  if (sort === 'added') return copy.sort((a, b) => b.added.localeCompare(a.added) || byDate(a, b))
  if (sort === 'distance' && origin) {
    const d = (e: HubEvent) => {
      const c = coords(e)
      return c ? distanceKm(origin, c) : Number.POSITIVE_INFINITY
    }
    return copy.sort((a, b) => d(a) - d(b) || byDate(a, b))
  }
  return copy.sort(byDate)
}
