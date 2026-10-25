import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
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
          {t.benefits.map(([h, p]) => (
            <div key={h} className="card tile">
              <h3 className="list-head">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 'var(--space-5)' }}>{t.benefitsNote}</p>
      </section>

      <section className="section stack" aria-labelledby="ms-fees">
        <h2 id="ms-fees">{t.feesTitle}</h2>
        <div className="grid-3">
          {([[t.feeStudents, 22, null, t.joinStudents, 'https://account.vde.com/Cockpit?context=jm'], [t.feeYp, 49, t.feeYpNote, t.joinYp, 'https://account.vde.com/Cockpit?context=pm']] as const).map(([label, fee, note, cta, href]) => (
            <div key={label} className="card stack" style={{ gap: 'var(--space-3)' }}>
              <h3 className="list-head">{label}</h3>
              {note && <p className="small muted" style={{ margin: 0 }}>{note}</p>}
              <p className="stat" style={{ margin: 0 }}>{formatPrice(fee, lang)} <span className="small muted" style={{ fontWeight: 'var(--fw-roman)' }}>{t.perYear}</span></p>
              <p style={{ margin: 0 }}>{t.feeFirstYear}</p>
              <a className="btn btn-cta" href={href} target="_blank" rel="noopener noreferrer">
                {cta}<span className="visually-hidden"> {t.external}</span>
              </a>
            </div>
          ))}
        </div>
        <p className="small muted">{t.feesNote}</p>
      </section>

      <section className="section" aria-labelledby="ms-cheaper">
        <h2 id="ms-cheaper">{t.cheaperTitle}</h2>
        <p>{t.cheaperLead}</p>
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
