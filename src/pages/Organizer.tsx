import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { AudienceBadge, PageHeader } from '../components/Badges'
import { useLocationLabel } from '../components/EventBits'
import { fmt, useLang, useLp, useT } from '../i18n'
import { organizerT, submitT } from '../i18n/submit'
import { taxonomy } from '../i18n/taxonomy'
import { mockStats, useDemo } from '../lib/demoStore'
import { formatDateRange, isPast, title } from '../lib/events'
import { formatDuration } from './Submit'

export default function Organizer() {
  const t = useT(organizerT)
  const st = useT(submitT)
  const tx = useT(taxonomy)
  const lang = useLang()
  const lp = useLp()
  const loc = useLocationLabel()
  const { pending, published, timing, approve, requestChanges } = useDemo()
  const [toast, setToast] = useState('')

  const queue = [...pending].sort((a, b) => (a.source === 'submitted' ? -1 : 0) - (b.source === 'submitted' ? -1 : 0) || a.start.localeCompare(b.start))
  const recent = published.filter((e) => timing[e.id]?.approvedAt).sort((a, b) => (timing[b.id].approvedAt ?? 0) - (timing[a.id].approvedAt ?? 0))
  const statRows = published.filter((e) => !isPast(e)).sort((a, b) => a.start.localeCompare(b.start))

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <p className="notice small">{t.demoNote}</p>
      </PageHeader>

      <p role="status" aria-live="polite" className={toast ? 'notice' : 'visually-hidden'}>{toast}</p>

      <section aria-labelledby="q-h" className="stack">
        <h2 id="q-h">{t.queue} <span className="badge badge-warning">{queue.length}</span></h2>
        {queue.length === 0 && <p className="notice">{t.queueEmpty}</p>}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="stack">
          {queue.map((e) => {
            const missingLoc = e.format === 'praesenz' && !e.location
            return (
              <li key={e.id} className="notice stack" style={{ gap: 'var(--space-3)' }}>
                <div className="badges">
                  <span className={`badge ${e.status === 'changes' ? 'badge-danger' : 'badge-warning'}`}>{tx.status[e.status]}</span>
                  <AudienceBadge audience={e.audience} />
                  {missingLoc && <span className="badge badge-danger">{t.missing}: {t.missingLocation}</span>}
                </div>
                <h3 className="panel-title">{title(e, lang)}</h3>
                <p className="meta-line">
                  <span>{formatDateRange(e, lang)}</span><span>{loc(e)}</span><span>{tx.type[e.type]}</span><span>{t.submittedBy}: {e.source === 'submitted' ? t.fromSubmit : t.fromNotion}</span>
                </p>
                <div className="row">
                  <button type="button" className="btn btn-success" onClick={() => { approve(e.id); setToast(fmt(t.approvedToast, { title: title(e, lang) })) }}>
                    {t.approve}
                  </button>
                  {e.status !== 'changes' && (
                    <button type="button" className="btn" onClick={() => { requestChanges(e.id); setToast(fmt(t.changesToast, { title: title(e, lang) })) }}>
                      {t.changes}
                    </button>
                  )}
                  <Link className="more" to={lp(`/events/${e.slug}`)}>{t.view}<Icon name="chevron-right" /></Link>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {recent.length > 0 && (
        <section className="section stack" aria-labelledby="r-h">
          <h2 id="r-h">{t.recent}</h2>
          <div className="table-wrap">
            <table className="data">
              <thead><tr><th scope="col">{t.event}</th><th scope="col">{t.ttp}</th></tr></thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id}>
                    <td><Link to={lp(`/events/${e.slug}`)}>{title(e, lang)}</Link></td>
                    <td><strong>{formatDuration((timing[e.id].approvedAt ?? 0) - timing[e.id].submittedAt, st)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="section stack" aria-labelledby="s-h">
        <div className="row-between">
          <h2 id="s-h" style={{ margin: 0 }}>{t.stats}</h2>
          
        </div>
        <p className="small muted">{t.statsNote}</p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr><th scope="col">{t.event}</th><th scope="col">{t.date}</th><th scope="col" style={{ textAlign: 'right' }}>{t.views}</th><th scope="col" style={{ textAlign: 'right' }}>{t.signups}</th></tr>
            </thead>
            <tbody>
              {statRows.map((e) => {
                const s = mockStats(e.id)
                return (
                  <tr key={e.id}>
                    <td><Link to={lp(`/events/${e.slug}`)}>{title(e, lang)}</Link></td>
                    <td className="small" style={{ whiteSpace: 'nowrap' }}>{formatDateRange(e, lang)}</td>
                    <td style={{ textAlign: 'right' }}>{s.views}</td>
                    <td style={{ textAlign: 'right' }}>{s.signups}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
