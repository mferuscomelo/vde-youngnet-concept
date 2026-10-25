import { Link, Navigate, useParams } from 'react-router-dom'
import { EventCard } from '../components/EventBits'
import { Icon } from '../components/Icon'
import { useLp, useT } from '../i18n'
import { audienceT, GROUPS, type Group } from '../i18n/audience'
import { common } from '../i18n/common'
import { useDemo } from '../lib/demoStore'
import { isPast, sortEvents, type Audience } from '../lib/events'

const AUDIENCE: Record<Group, Audience | null> = {
  studierende: 'students',
  'young-professionals': 'young-professionals',
  'schueler-azubis': null, // open events only
}

export default function Zielgruppe() {
  const { group } = useParams()
  const t = useT(audienceT)
  const c = useT(common)
  const lp = useLp()
  const { published } = useDemo()
  if (!GROUPS.includes(group as Group)) return <Navigate to={lp('/')} replace />
  const g = group as Group
  const p = t[g]
  const aud = AUDIENCE[g]
  const events = sortEvents(
    published.filter((e) => !isPast(e) && (e.audience === 'all' || e.audience === aud)),
    'date',
    null,
  ).slice(0, 3)

  return (
    <>
      <nav className="tabs" aria-label={t.tabsLabel}>
        {GROUPS.map((k) => (
          <Link key={k} className="tab" to={lp(`/fuer/${k}`)} aria-current={k === g ? 'page' : undefined}>{t[k].tab}</Link>
        ))}
      </nav>

      <section className="stage" aria-labelledby="aud-h">
        <img className="stage-img" src={p.img} alt={p.alt} width="1023" height="512" />
        <div className="stage-box stack">
          <h1 id="aud-h">{p.title}</h1>
          <p>{p.lead}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="offers-h">
        <h2 id="offers-h">{p.offersTitle}</h2>
        <div className="grid">
          {p.offers.map(([title, text]) => (
            <div key={title} className="card tile">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        {p.note && <p className="notice" style={{ marginTop: 'var(--space-6)' }}>{p.note}</p>}
      </section>

      <section className="section" aria-labelledby="aud-events-h">
        <div className="row-between" style={{ marginBottom: 'var(--space-5)' }}>
          <h2 id="aud-events-h" style={{ margin: 0 }}>{p.eventsTitle}</h2>
          <Link className="more" to={lp(aud ? `/events?aud=${aud}` : '/events')}>{c.allEvents}<Icon name="chevron-right" /></Link>
        </div>
        {events.length ? (
          <div className="grid-3">{events.map((e) => <EventCard key={e.id} event={e} />)}</div>
        ) : (
          <p className="muted">{t.noEvents}</p>
        )}
      </section>

      <section className="section" aria-labelledby="aud-links-h">
        <h2 id="aud-links-h" className="panel-title list-head">{t.linksTitle}</h2>
        <ul className="item-list">
          {p.links.map(([label, to]) => (
            <li key={to}>
              {to.startsWith('http') ? (
                <a href={to} target="_blank" rel="noopener noreferrer">{label} <Icon name="external" size={16} /></a>
              ) : (
                <Link to={lp(to)}>{label}</Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
