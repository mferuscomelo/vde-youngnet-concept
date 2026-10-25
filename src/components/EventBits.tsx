import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fmt, useLang, useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { eventsT } from '../i18n/events'
import { taxonomy } from '../i18n/taxonomy'
import { downloadICS, googleUrl, icsForEvents, outlookUrl } from '../lib/calendar'
import { useDemo } from '../lib/demoStore'
import { formatDateRange, title, type HubEvent } from '../lib/events'
import { placeLabel } from '../lib/places'
import { AudienceBadge } from './Badges'

export function useLocationLabel() {
  const t = useT(common)
  return (e: HubEvent) =>
    e.location === 'online' ? t.online : e.location === 'alle-bvs' ? t.allBvs : placeLabel(e.location) ?? t.locationTba
}

export function BookmarkButton({ event }: { event: HubEvent }) {
  const t = useT(common)
  const lang = useLang()
  const { isBookmarked, toggleBookmark } = useDemo()
  const on = isBookmarked(event.id)
  return (
    <button
      type="button"
      className="btn"
      aria-pressed={on}
      aria-label={fmt(on ? t.unbookmarkAria : t.bookmarkAria, { title: title(event, lang) })}
      onClick={() => toggleBookmark(event.id)}
    >
      {on ? t.bookmarked : t.bookmark}
    </button>
  )
}

export function EventCard({ event, showStatus = false, preview = false }: { event: HubEvent; showStatus?: boolean; preview?: boolean }) {
  const lang = useLang()
  const lp = useLp()
  const tx = useT(taxonomy)
  const te = useT(eventsT)
  const loc = useLocationLabel()
  return (
    <article className="event-card">
      <div className={`cover cover-${event.cover}`} aria-hidden="true">{tx.type[event.type]}</div>
      <div className="body">
        <div className="badges">
          <AudienceBadge audience={event.audience} />
          {event.recap && <span className="badge badge-success">{te.recap}</span>}
          {showStatus && event.status !== 'published' && <span className="badge badge-warning">{tx.status[event.status]}</span>}
        </div>
        <div className="event-meta">
          <span className="date-block">{formatDateRange(event, lang)}</span>
          <span>{loc(event)}</span>
        </div>
        <h3>
          {preview ? title(event, lang) : <Link to={lp(`/events/${event.slug}`)}>{title(event, lang)}</Link>}
        </h3>
        {!preview && (
          <div className="actions row">
            <BookmarkButton event={event} />
          </div>
        )}
      </div>
    </article>
  )
}

const cal = {
  de: { add: 'Zum Kalender hinzufügen', ics: 'ICS-Datei (Outlook, Apple, alle)', outlook: 'Outlook (Microsoft 365)', outlookLive: 'Outlook.com (privat)', google: 'Google Kalender' },
  en: { add: 'Add to calendar', ics: 'ICS file (Outlook, Apple, any)', outlook: 'Outlook (Microsoft 365)', outlookLive: 'Outlook.com (personal)', google: 'Google Calendar' },
}

export function AddToCalendar({ event }: { event: HubEvent }) {
  const lang = useLang()
  const t = cal[lang]
  const [open, setOpen] = useState(false)
  return (
    <div className="stack" style={{ gap: 'var(--space-2)' }}>
      <button type="button" className="btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {t.add}
      </button>
      {open && (
        <ul className="popover-list">
          <li>
            <button type="button" onClick={() => downloadICS(event.slug, icsForEvents([event], lang, title(event, lang)))}>
              {t.ics}
            </button>
          </li>
          <li><a href={outlookUrl(event, lang, 'office')} target="_blank" rel="noopener noreferrer">{t.outlook}</a></li>
          <li><a href={outlookUrl(event, lang, 'live')} target="_blank" rel="noopener noreferrer">{t.outlookLive}</a></li>
          <li><a href={googleUrl(event, lang)} target="_blank" rel="noopener noreferrer">{t.google}</a></li>
        </ul>
      )}
    </div>
  )
}
