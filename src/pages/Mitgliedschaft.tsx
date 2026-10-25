import { Link } from 'react-router-dom'
import { PageHeader, SampleBadge, Todo } from '../components/Badges'
import { fmt, useLang, useLp, useT } from '../i18n'
import { membership } from '../i18n/membership'
import { useDemo } from '../lib/demoStore'
import { formatDateRange, formatPrice, isPast, title } from '../lib/events'

export default function Mitgliedschaft() {
  const t = useT(membership)
  const lang = useLang()
  const lp = useLp()
  const { published } = useDemo()
  const cheaper = published
    .filter((e) => !isPast(e) && e.price_member != null && e.price_nonmember != null && e.price_member < e.price_nonmember)
    .sort((a, b) => a.start.localeCompare(b.start))

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />

      <section aria-labelledby="ms-benefits">
        <h2 id="ms-benefits">{t.benefitsTitle}</h2>
        <div className="grid">
          {t.benefits.map(([icon, h, p]) => (
            <div key={h} className="card tile">
              <span className="tile-icon" aria-hidden="true">{icon}</span>
              <h3>{h}</h3>
              <p className="muted" style={{ margin: 0 }}>{p}</p>
            </div>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 'var(--space-3)' }}>{t.benefitsNote}</p>
      </section>

      <section className="section" aria-labelledby="ms-fees">
        <h2 id="ms-fees">{t.feesTitle}</h2>
        <div className="grid">
          {[t.feeStudents, t.feeYp].map((label) => (
            <div key={label} className="card card-muted stack" style={{ gap: 'var(--space-2)' }}>
              <h3>{label}</h3>
              <p style={{ margin: 0 }}><Todo>{t.feeTodo}</Todo> <span className="muted">{t.perYear}</span></p>
            </div>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 'var(--space-3)' }}>{t.feesNote}</p>
        <a className="btn btn-primary" href="https://www.vde.com/de/mitgliedschaft" target="_blank" rel="noopener noreferrer">
          {t.join} ↗<span className="visually-hidden"> {t.external}</span>
        </a>
      </section>

      <section className="section" aria-labelledby="ms-cheaper">
        <h2 id="ms-cheaper">{t.cheaperTitle}</h2>
        <p className="muted">{t.cheaperLead}</p>
        {cheaper.length === 0 ? (
          <p>{t.cheaperNone}</p>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr><th scope="col">{t.colEvent}</th><th scope="col">{t.colDate}</th><th scope="col">{t.colMember}</th><th scope="col">{t.colNon}</th></tr>
              </thead>
              <tbody>
                {cheaper.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <Link to={lp(`/events/${e.slug}`)}>{title(e, lang)}</Link>{' '}
                      {e.source === 'demo' && <SampleBadge />}
                    </td>
                    <td>{formatDateRange(e, lang)}</td>
                    <td><strong>{formatPrice(e.price_member, lang)}</strong></td>
                    <td>
                      {formatPrice(e.price_nonmember, lang)}
                      <div className="small muted">{fmt(t.save, { amount: formatPrice(e.price_nonmember! - e.price_member!, lang) ?? '' })}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
