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
              <p className="muted">{p}</p>
              <span className="badge badge-neutral">⏱ {t.time}: {time}</span>
            </li>
          ))}
        </ol>
        <Link className="btn btn-primary" to={lp('/einreichen')}>+ {t.cta}</Link>
      </section>

      <section className="section" aria-labelledby="mm-roles">
        <h2 id="mm-roles">{t.rolesTitle}</h2>
        <p className="muted">{t.rolesLead}</p>
        <div className="grid">
          {t.roles.map(([h, p, hours]) => (
            <div key={h} className="card stack" style={{ gap: 'var(--space-2)' }}>
              <h3>{h}</h3>
              <p className="muted" style={{ margin: 0 }}>{p}</p>
              <p style={{ margin: 0 }}><strong>{hours}</strong> <span className="muted">{t.perMonth}</span></p>
            </div>
          ))}
        </div>
      </section>

      <section className="section card card-muted stack" aria-labelledby="mm-start">
        <h2 id="mm-start">{t.contactTitle}</h2>
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
