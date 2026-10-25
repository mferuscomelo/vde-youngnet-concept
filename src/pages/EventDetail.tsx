import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AudienceBadge, SampleBadge, Todo } from '../components/Badges'
import { AddToCalendar, BookmarkButton, EventCard, useLocationLabel } from '../components/EventBits'
import { MapView } from '../components/MapView'
import { fmt, useLang, useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { eventsT } from '../i18n/events'
import { taxonomy } from '../i18n/taxonomy'
import { useDemo } from '../lib/demoStore'
import { coords, description, formatDateRange, formatPrice, isPast, title, type HubEvent } from '../lib/events'

function related(e: HubEvent, all: HubEvent[]): HubEvent[] {
  const score = (o: HubEvent) =>
    (o.audience === e.audience ? 2 : 0) + (o.type === e.type ? 2 : 0) + (o.fachgesellschaft && o.fachgesellschaft === e.fachgesellschaft ? 3 : 0) + (o.region === e.region ? 1 : 0)
  return all
    .filter((o) => o.id !== e.id && !isPast(o))
    .map((o) => [o, score(o)] as const)
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1] || a[0].start.localeCompare(b[0].start))
    .slice(0, 3)
    .map(([o]) => o)
}

export default function EventDetail() {
  const { slug } = useParams()
  const t = useT(eventsT)
  const d = t.detail
  const c = useT(common)
  const tx = useT(taxonomy)
  const lang = useLang()
  const lp = useLp()
  const loc = useLocationLabel()
  const { events, published } = useDemo()
  const [signedUp, setSignedUp] = useState(false)
  const e = events.find((x) => x.slug === slug)
  if (!e) {
    return (
      <div className="stack">
        <p className="notice">{d.notFound}</p>
        <Link to={lp('/events')}>← {c.allEvents}</Link>
      </div>
    )
  }
  const pt = coords(e)
  const past = isPast(e)
  const pm = formatPrice(e.price_member, lang)
  const pn = formatPrice(e.price_nonmember, lang)
  const showTravel = !past && e.format === 'praesenz' && ['kongress', 'yp-meetup', 'junges-forum'].includes(e.type)

  return (
    <article className="stack">
      <Link to={lp(past ? '/events?tab=archiv' : '/events')} className="small">← {c.allEvents}</Link>
      {e.status !== 'published' && <p className="notice notice-warning">{d.pendingNote}</p>}

      <div className={`cover-${e.cover}`} style={{ borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)', color: 'var(--color-text-inverse)' }}>
        <div className="row" style={{ gap: 6, marginBottom: 'var(--space-3)' }}>
          <span className="badge badge-neutral">{tx.type[e.type]}</span>
          <span className="badge badge-neutral">{tx.format[e.format]}</span>
        </div>
        <h1 style={{ margin: 0, maxWidth: '24ch' }}>{title(e, lang)}</h1>
        <p style={{ margin: 'var(--space-2) 0 0', fontWeight: 600 }}>{formatDateRange(e, lang)} · {loc(e)}</p>
      </div>

      <div className="grid-2 wide-left">
        <div className="stack">
          <section className="card stack" aria-labelledby="forwhom" style={{ borderWidth: 2, borderColor: `var(--color-aud-${e.audience === 'young-professionals' ? 'yp' : e.audience})` }}>
            <div className="row-between">
              <h2 id="forwhom" style={{ margin: 0, fontSize: '1.25rem' }}>{d.forWhom}</h2>
              <AudienceBadge audience={e.audience} />
            </div>
            <p style={{ margin: 0 }}>{d.forWhomText[e.audience]}</p>
            {d.notFor[e.audience] && <p className="small muted" style={{ margin: 0 }}>{d.notFor[e.audience]}</p>}
          </section>

          <div className="prose">
            <p>{description(e, lang)} {e.source !== 'submitted' && <SampleBadge kind="sampleText" />}</p>
            <p className="small muted">{d.source[e.source]}</p>
          </div>

          {e.recap && (
            <section className="card stack" aria-labelledby="recap-h">
              <div className="row-between">
                <h2 id="recap-h" style={{ margin: 0, fontSize: '1.25rem' }}>{d.recapTitle}</h2>
                <SampleBadge />
              </div>
              <p className="stat">{e.recap.participants} <span className="small muted" style={{ fontWeight: 400 }}>{d.participants}</span></p>
              <p>{lang === 'en' ? e.recap.text_en : e.recap.text_de}</p>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))' }}>
                {Array.from({ length: e.recap.photos }, (_, i) => (
                  <div key={i} role="img" aria-label={fmt(d.photoAlt, { n: i + 1 })} className={`cover-${((e.cover + i) % 4) + 1}`}
                    style={{ aspectRatio: '4 / 3', borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', color: 'var(--color-text-inverse)', fontSize: '0.75rem' }}>
                    <span aria-hidden="true">📷 {i + 1}</span>
                  </div>
                ))}
              </div>
              <blockquote style={{ margin: 0, paddingLeft: 'var(--space-3)', borderLeft: '4px solid var(--color-border-strong)' }}>
                <p style={{ margin: 0 }}>{lang === 'en' ? e.recap.quote_en : e.recap.quote_de}</p>
                <footer className="small muted">— {d.quoteBy}</footer>
              </blockquote>
            </section>
          )}

          {pt && <MapView points={[{ id: e.id, ...pt, label: loc(e), popup: loc(e) }]} height={260} />}
          {e.format === 'online' && <p className="notice notice-info">{d.onlineNote}</p>}
          {e.format === 'dezentral' && <p className="notice notice-info">{d.dezentralNote}</p>}
        </div>

        <aside className="stack">
          <dl className="kv card">
            <dt>{d.when}</dt>
            <dd>{formatDateRange(e, lang)}<br /><span className="small muted">{d.dateOnly}</span></dd>
            <dt>{d.where}</dt>
            <dd>{loc(e)}</dd>
            <dt>{d.type}</dt>
            <dd>{tx.type[e.type]}</dd>
            <dt>{d.goals}</dt>
            <dd>{e.goals.map((g) => tx.goal[g]).join(', ')}</dd>
            <dt>{d.organizer}</dt>
            <dd>{e.organizer}</dd>
            {e.fachgesellschaft && (<><dt>{d.fg}</dt><dd><Link to={lp('/fachgesellschaften')}>{e.fachgesellschaft}</Link></dd></>)}
            <dt>{d.price}</dt>
            <dd>
              {pm != null && pn != null ? (
                <>{c.members}: <strong>{pm}</strong><br />{c.nonMembers}: {pn}</>
              ) : (
                <>{c.priceTba} {e.source === 'notion' && <Todo>Preise ergänzen</Todo>}</>
              )}
            </dd>
            <dt>{d.language}</dt>
            <dd>{tx.language[e.language] ?? e.language}</dd>
          </dl>

          {!past && (
            <div className="stack" style={{ gap: 'var(--space-2)' }}>
              <button type="button" className="btn btn-primary" onClick={() => setSignedUp(true)} disabled={e.status !== 'published'}>{d.signup}</button>
              {signedUp && <p className="notice notice-success small" role="status">{d.signupDone}</p>}
              <BookmarkButton event={e} small={false} />
              <AddToCalendar event={e} />
            </div>
          )}

          <div className="card card-muted stack" style={{ gap: 'var(--space-2)' }}>
            <strong>{d.memberCta}</strong>
            <Link to={lp('/mitgliedschaft')}>{d.memberLink} →</Link>
          </div>

          {showTravel && (
            <div className="card stack" style={{ gap: 'var(--space-2)' }}>
              <strong>🚆 {d.travel}</strong>
              <span className="small muted">{d.travelText}</span>
              <Link className="btn btn-sm" to={lp(`/mitfahren?event=${e.slug}`)}>{d.travel} →</Link>
            </div>
          )}
        </aside>
      </div>

      {related(e, published).length > 0 && (
        <section className="section" aria-labelledby="rel-h">
          <h2 id="rel-h">{d.related}</h2>
          <div className="grid">
            {related(e, published).map((r) => <EventCard key={r.id} event={r} />)}
          </div>
        </section>
      )}
    </article>
  )
}
