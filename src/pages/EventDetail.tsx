import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AudienceBadge } from '../components/Badges'
import { AddToCalendar, BookmarkButton, EventCard, useLocationLabel } from '../components/EventBits'
import { Icon } from '../components/Icon'
import { MapView } from '../components/MapView'
import { useLang, useLp, useT } from '../i18n'
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
        <Link className="back" to={lp('/events')}><Icon name="chevron-left" />{c.allEvents}</Link>
      </div>
    )
  }
  const pt = coords(e)
  const past = isPast(e)
  const pm = formatPrice(e.price_member, lang)
  const pn = formatPrice(e.price_nonmember, lang)
  const note = lang === 'en' ? e.note_en : e.note_de
  const priceNote = lang === 'en' ? e.price_note_en : e.price_note_de
  const showTravel = !past && e.format === 'praesenz' && ['kongress', 'yp-meetup', 'junges-forum'].includes(e.type)

  return (
    <article className="stack">
      <Link to={lp(past ? '/events?tab=archiv' : '/events')} className="back"><Icon name="chevron-left" />{c.allEvents}</Link>
      {e.status !== 'published' && <p className="notice">{d.pendingNote}</p>}

      <header className="stack" style={{ gap: 'var(--space-3)' }}>
        <div className="badges">
          <AudienceBadge audience={e.audience} />
        </div>
        <p className="meta-line"><span>{formatDateRange(e, lang)}</span><span>{loc(e)}</span><span>{tx.type[e.type]}</span></p>
        <h1 style={{ margin: 0, maxWidth: '30ch' }}>{title(e, lang)}</h1>
      </header>

      <div className="grid-2 wide-left">
        <div className="stack">
          <section className="notice stack" aria-labelledby="forwhom">
            <div className="row-between">
              <h2 id="forwhom" className="panel-title">{d.forWhom}</h2>
              <AudienceBadge audience={e.audience} />
            </div>
            <p style={{ margin: 0 }}>{d.forWhomText[e.audience]}</p>
            {d.notFor[e.audience] && <p className="small muted" style={{ margin: 0 }}>{d.notFor[e.audience]}</p>}
          </section>

          <div className="prose stack" style={{ gap: 'var(--space-4)' }}>
            {description(e, lang).split('\n\n').map((para) => <p key={para}>{para}</p>)}
            {note && <p className="muted">{note}</p>}
            {e.link && (
              <a className="more" href={e.link.url} target="_blank" rel="noopener noreferrer">
                {d.officialPage}: {lang === 'en' ? e.link.label_en : e.link.label_de}
              </a>
            )}
          </div>

          {e.recap && (
            <section className="card stack" aria-labelledby="recap-h">
              <h2 id="recap-h" className="panel-title list-head">{d.recapTitle}</h2>
              <p className="stat">{e.recap.participants} <span className="small muted" style={{ fontWeight: 'var(--fw-roman)' }}>{d.participants}</span></p>
              <p>{lang === 'en' ? e.recap.text_en : e.recap.text_de}</p>
              <blockquote className="quote">
                <p style={{ margin: 0 }}>{lang === 'en' ? e.recap.quote_en : e.recap.quote_de}</p>
                <footer className="small muted">{d.quoteBy}</footer>
              </blockquote>
            </section>
          )}

          {pt && <MapView points={[{ id: e.id, ...pt, label: loc(e), popup: loc(e) }]} height={260} />}
          {e.format === 'online' && <p className="notice">{d.onlineNote}</p>}
          {e.format === 'dezentral' && <p className="notice">{d.dezentralNote}</p>}
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
              {priceNote ? (
                priceNote
              ) : e.tickets_url ? (
                <>
                  {d.freeTickets}
                  <br /><a href={e.tickets_url} target="_blank" rel="noopener noreferrer">{d.freeTicketsLink}</a>
                </>
              ) : pm != null && pm === pn ? (
                pm
              ) : pm != null && pn != null ? (
                <>{c.members}: <strong>{pm}</strong><br />{c.nonMembers}: {pn}</>
              ) : (
                c.priceTba
              )}
            </dd>
            <dt>{d.language}</dt>
            <dd>{tx.language[e.language] ?? e.language}</dd>
          </dl>

          {!past && (
            <div className="btn-col">
              <button type="button" className="btn btn-cta" onClick={() => setSignedUp(true)} disabled={e.status !== 'published'}>{d.signup}</button>
              {signedUp && <p className="notice small" role="status">{d.signupDone}</p>}
              <BookmarkButton event={e} />
              <AddToCalendar event={e} />
            </div>
          )}

          <div className="card stack" style={{ gap: 'var(--space-3)' }}>
            <h2 className="panel-title list-head">{d.memberCta}</h2>
            <Link className="more" to={lp('/mitgliedschaft')}>{d.memberLink}<Icon name="chevron-right" /></Link>
          </div>

          {showTravel && (
            <div className="card stack" style={{ gap: 'var(--space-3)' }}>
              <h2 className="panel-title list-head">{d.travel}</h2>
              <p style={{ margin: 0 }}>{d.travelText}</p>
              <Link className="more" to={lp(`/mitfahren?event=${e.slug}`)}>{d.travelLink}<Icon name="chevron-right" /></Link>
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
