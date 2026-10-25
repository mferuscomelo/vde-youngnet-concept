import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, SampleBadge } from '../components/Badges'
import { useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { info } from '../i18n/info'

export default function Kontakt() {
  const t = useT(info).contact
  const c = useT(common)
  const lp = useLp()
  const id = useId()
  const [sent, setSent] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  const addresses: [string, string][] = [
    [t.general, 'kontakt@example.org'],
    [t.events, 'events@example.org'],
    [t.press, 'presse@example.org'],
  ]
  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      <div className="grid-2">
        <section className="stack" aria-labelledby={`${id}-addr`}>
          <div className="row">
            <h2 id={`${id}-addr`} style={{ margin: 0 }}>{t.addrTitle}</h2>
            <SampleBadge kind="placeholder" />
          </div>
          <dl className="kv">
            {addresses.map(([label, mail]) => (
              <div key={mail} style={{ display: 'contents' }}>
                <dt>{label}</dt>
                <dd>{mail} <span className="small muted">({c.placeholder})</span></dd>
              </div>
            ))}
          </dl>
          <p className="small muted">{t.placeholderNote}</p>
          <div>
            <Link className="btn" to={lp('/ansprechpartner')}>{t.perRegion} →</Link>
          </div>
        </section>

        <section className="card stack" aria-labelledby={`${id}-form`}>
          <h2 id={`${id}-form`}>{t.formTitle}</h2>
          <p className="small muted">{c.demoOnly}</p>
          {sent ? (
            <p className="notice notice-success" role="status">{t.sent}</p>
          ) : (
            <form onSubmit={onSubmit} className="form-grid">
              <div className="field">
                <label htmlFor={`${id}-name`}>{t.name}</label>
                <input id={`${id}-name`} type="text" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor={`${id}-email`}>{t.email}</label>
                <input id={`${id}-email`} type="email" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor={`${id}-topic`}>{t.topic}</label>
                <select id={`${id}-topic`}>
                  {t.topics.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor={`${id}-msg`}>{t.message}</label>
                <textarea id={`${id}-msg`} required />
              </div>
              <div><button className="btn btn-primary" type="submit">{t.send}</button></div>
            </form>
          )}
        </section>
      </div>
    </>
  )
}
