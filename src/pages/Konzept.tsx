import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { useLp, useT } from '../i18n'
import { concept } from '../i18n/concept'

export default function Konzept() {
  const t = useT(concept)
  const lp = useLp()
  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />

      <section className="prose stack" aria-labelledby="k-who">
        <h2 id="k-who">{t.whoTitle}</h2>
        <p className="notice notice-warning">{t.who}</p>
      </section>

      <section className="section" aria-labelledby="k-problems">
        <h2 id="k-problems">{t.problemsTitle}</h2>
        <div className="grid">
          {t.problems.map(([h, p]) => (
            <div key={h} className="card">
              <h3>{h}</h3>
              <p className="muted" style={{ margin: 0 }}>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="k-shows">
        <h2 id="k-shows">{t.showsTitle}</h2>
        <div className="grid">
          {t.shows.map(([h, to, p]) => (
            <Link key={h} to={lp(to)} className="card card-link">
              <h3>{h} →</h3>
              <p className="muted" style={{ margin: 0 }}>{p}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid-2 section">
        <section aria-labelledby="k-data">
          <h2 id="k-data">{t.dataTitle}</h2>
          <ul>{t.data.map((d) => <li key={d}>{d}</li>)}</ul>
        </section>
        <section aria-labelledby="k-brand">
          <h2 id="k-brand">{t.brandTitle}</h2>
          <p>{t.brand}</p>
        </section>
      </div>

      <section className="section card card-muted stack" aria-labelledby="k-asks">
        <h2 id="k-asks">{t.asksTitle}</h2>
        <ol>{t.asks.map((a) => <li key={a}>{a}</li>)}</ol>
        <div><Link className="btn btn-primary" to={lp('/')}>{t.start}</Link></div>
      </section>
    </>
  )
}
