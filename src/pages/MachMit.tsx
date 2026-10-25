import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { useLp, useT } from '../i18n'
import { machmit } from '../i18n/machmit'

export default function MachMit() {
  const t = useT(machmit)
  const lp = useLp()
  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />

      <section aria-labelledby="mm-guide">
        <h2 id="mm-guide">{t.guideTitle}</h2>
        <ol className="steps prose">
          {t.steps.map(([h, p, time]) => (
            <li key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
              <p className="meta-line">{t.time}: {time}</p>
            </li>
          ))}
        </ol>
        <Link className="btn btn-cta" to={lp('/einreichen')}>{t.cta}</Link>
      </section>

      <section className="section" aria-labelledby="mm-roles">
        <h2 id="mm-roles">{t.rolesTitle}</h2>
        <p>{t.rolesLead}</p>
        <div className="grid">
          {t.roles.map(([h, p, hours]) => (
            <div key={h} className="card stack" style={{ gap: 'var(--space-3)' }}>
              <h3 className="list-head">{h}</h3>
              <p style={{ margin: 0 }}>{p}</p>
              <p className="meta-line">{hours} {t.perMonth}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section card stack" aria-labelledby="mm-start">
        <h2 id="mm-start" className="panel-title list-head">{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <div className="row">
          <Link className="btn" to={lp('/ansprechpartner')}>{t.contacts}</Link>
          <Link className="btn" to={lp('/hochschulgruppen')}>{t.hsg}</Link>
          <Link className="btn" to={lp('/mentoring')}>{t.mentoring}</Link>
        </div>
      </section>
    </>
  )
}
