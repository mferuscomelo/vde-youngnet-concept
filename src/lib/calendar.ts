import type { Lang } from '../i18n'
import { buildICS, eventToItem, addDays, compactDate } from './ics.js'
import type { HubEvent } from './events'
import { placeLabel } from './places'

// Site root including the base path, e.g. https://user.github.io/repo
const origin = () => (typeof window !== 'undefined' ? window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '') : '')

export function icsForEvents(events: HubEvent[], lang: Lang, name: string): string {
  return buildICS(events.map((e) => eventToItem(e, { lang, origin: origin(), placeLabel: (k) => placeLabel(k) ?? k })), { name })
}

export function downloadICS(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.ics') ? filename : `${filename}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function item(e: HubEvent, lang: Lang) {
  return eventToItem(e, { lang, origin: origin(), placeLabel: (k) => placeLabel(k) ?? k })
}

/** Outlook on the web (Microsoft 365 work accounts). All-day end date is exclusive. */
export function outlookUrl(e: HubEvent, lang: Lang, host: 'office' | 'live' = 'office'): string {
  const it = item(e, lang)
  const base = host === 'office' ? 'https://outlook.office.com' : 'https://outlook.live.com'
  const p = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: it.summary,
    startdt: e.start,
    enddt: addDays(e.end, 1),
    allday: 'true',
    body: it.description ?? '',
    location: it.location ?? '',
  })
  return `${base}/calendar/0/deeplink/compose?${p}`
}

export function googleUrl(e: HubEvent, lang: Lang): string {
  const it = item(e, lang)
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: it.summary,
    dates: `${compactDate(e.start)}/${compactDate(addDays(e.end, 1))}`,
    details: it.description ?? '',
    location: it.location ?? '',
  })
  return `https://calendar.google.com/calendar/render?${p}`
}

/** Static, pre-generated feeds (see scripts/gen-ics.mjs). */
export function feedUrl(feed: 'all' | 'young-professionals' | 'students', lang: Lang): string {
  return `${origin()}/ics/${feed}-${lang}.ics`
}

export function webcalUrl(httpsUrl: string): string {
  return httpsUrl.replace(/^https?:/, 'webcal:')
}

export function outlookSubscribeUrl(httpsUrl: string, name: string): string {
  return `https://outlook.office.com/calendar/0/addfromweb?url=${encodeURIComponent(httpsUrl)}&name=${encodeURIComponent(name)}`
}
