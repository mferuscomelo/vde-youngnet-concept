import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { EventCard } from '../components/EventBits'
import { useLang, useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { myevents } from '../i18n/myevents'
import { downloadICS, icsForEvents } from '../lib/calendar'
import { useDemo } from '../lib/demoStore'
import { isPast } from '../lib/events'
import { storageAvailable } from '../lib/storage'

export default function MeineEvents() {
  const t = useT(myevents)
  const c = useT(common)
  const lang = useLang()
  const lp = useLp()
  const [canStore] = useState(storageAvailable)
  const { events, bookmarks } = useDemo()
  const saved = events.filter((e) => bookmarks.includes(e.id) && e.status === 'published')
  const upcoming = saved.filter((e) => !isPast(e)).sort((a, b) => a.start.localeCompare(b.start))
  const past = saved.filter((e) => isPast(e)).sort((a, b) => b.start.localeCompare(a.start))

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      {!canStore && <p className="notice notice-warning">{c.storageOff}</p>}

      {saved.length === 0 ? (
        <div className="card card-muted stack" style={{ textAlign: 'center', padding: 'var(--space-7) var(--space-4)' }}>
          <span className="tile-icon" aria-hidden="true">☆</span>
          <h2>{t.emptyTitle}</h2>
          <p className="muted">{t.emptyText}</p>
          <div><Link className="btn btn-primary" to={lp('/events')}>{t.browse}</Link></div>
        </div>
      ) : (
        <>
          <section aria-labelledby="me-up" className="stack">
            <div className="row-between">
              <h2 id="me-up" style={{ margin: 0 }}>{t.upcoming} ({upcoming.length})</h2>
              <button
                type="button"
                className="btn"
                disabled={upcoming.length === 0}
                aria-describedby="me-export-hint"
                onClick={() => downloadICS('meine-events', icsForEvents(upcoming, lang, t.calName))}
              >
                📅 {t.export}
              </button>
            </div>
            <p id="me-export-hint" className="small muted">{t.exportHint}</p>
            <div className="grid">
              {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </section>
          {past.length > 0 && (
            <section className="section stack" aria-labelledby="me-past">
              <h2 id="me-past">{t.past} ({past.length})</h2>
              <div className="grid">
                {past.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
