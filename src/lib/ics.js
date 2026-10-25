// iCalendar (RFC 5545) generation, shared by the browser and scripts/gen-ics.mjs.
// Plain JS so Node can import it without a build step. All events are all-day
// (the seed data has no times), which Outlook handles best with VALUE=DATE plus
// an exclusive DTEND and X-MICROSOFT-CDO-ALLDAYEVENT.

const CRLF = '\r\n'

function escapeText(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

// Fold lines at 75 octets (UTF-8), never splitting a multi-byte character.
function fold(line) {
  const enc = new TextEncoder()
  if (enc.encode(line).length <= 75) return line
  const out = []
  let cur = ''
  let curBytes = 0
  for (const ch of line) {
    const b = enc.encode(ch).length
    const limit = out.length === 0 ? 75 : 74 // continuation lines start with a space
    if (curBytes + b > limit) {
      out.push(cur)
      cur = ''
      curBytes = 0
    }
    cur += ch
    curBytes += b
  }
  out.push(cur)
  return out.join(CRLF + ' ')
}

export function compactDate(iso) {
  return iso.replace(/-/g, '')
}

export function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + n))
  return dt.toISOString().slice(0, 10)
}

function stamp(now) {
  return now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/**
 * @param {Array<{uid:string,start:string,end:string,summary:string,description?:string,location?:string,url?:string}>} items
 * @param {{name:string, now?:Date}} opts
 */
export function buildICS(items, { name, now = new Date() }) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YoungNet Hub Konzept-Prototyp//DE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(name)}`,
    'X-WR-TIMEZONE:Europe/Berlin',
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
  ]
  for (const it of items) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${it.uid}`,
      `DTSTAMP:${stamp(now)}`,
      `DTSTART;VALUE=DATE:${compactDate(it.start)}`,
      `DTEND;VALUE=DATE:${compactDate(addDays(it.end, 1))}`,
      `SUMMARY:${escapeText(it.summary)}`,
    )
    if (it.description) lines.push(`DESCRIPTION:${escapeText(it.description)}`)
    if (it.location) lines.push(`LOCATION:${escapeText(it.location)}`)
    if (it.url) lines.push(`URL:${it.url}`)
    lines.push('TRANSP:TRANSPARENT', 'X-MICROSOFT-CDO-ALLDAYEVENT:TRUE', 'X-MICROSOFT-CDO-BUSYSTATUS:FREE', 'END:VEVENT')
  }
  lines.push('END:VCALENDAR')
  return lines.map(fold).join(CRLF) + CRLF
}

/** Map a hub event to an ICS item. */
export function eventToItem(e, { lang = 'de', origin = '', placeLabel = (k) => k } = {}) {
  const loc = e.location === 'online' ? 'Online' : e.location === 'alle-bvs' ? (lang === 'de' ? 'Alle Bezirksvereine' : 'All districts') : e.location ? placeLabel(e.location) : lang === 'de' ? 'Ort folgt' : 'Location TBA'
  const url = origin ? `${origin}/${lang}/events/${e.slug}` : undefined
  const prefix = lang === 'de' ? '[Konzept-Prototyp, Beispieldaten] ' : '[Concept prototype, sample data] '
  return {
    uid: `${e.id}@youngnet-hub.concept`,
    start: e.start,
    end: e.end,
    summary: lang === 'en' ? e.title_en : e.title_de,
    description: prefix + (lang === 'en' ? e.description_en : e.description_de) + (url ? `\n\n${url}` : ''),
    location: loc,
    url,
  }
}
