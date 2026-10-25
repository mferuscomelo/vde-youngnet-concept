import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { useLp, useT } from '../i18n'
import { MEMBER_SERVICE, PRESS_OFFICE, YOUNG_NET_OFFICE } from '../data/directory'
import { info } from '../i18n/info'

export default function Kontakt() {
  const t = useT(info).contact
  const lp = useLp()
  const id = useId()
  const [sent, setSent] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  const addresses: [string, string, string][] = [
    [t.general, YOUNG_NET_OFFICE.email, YOUNG_NET_OFFICE.phone],
    [t.events, YOUNG_NET_OFFICE.email, ''],
    [t.press, PRESS_OFFICE.email, ''],
    [t.members, MEMBER_SERVICE.email, MEMBER_SERVICE.phone],
  ]
  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      <div className="grid-2">
        <section className="stack" aria-labelledby={`${id}-addr`}>
          <h2 id={`${id}-addr`} style={{ margin: 0 }}>{t.addrTitle}</h2>
          <p style={{ margin: 0 }}><strong>{YOUNG_NET_OFFICE.name}</strong><br />{YOUNG_NET_OFFICE.address}</p>
          <dl className="kv">
            {addresses.map(([label, mail, phone]) => (
              <div key={label} style={{ display: 'contents' }}>
                <dt>{label}</dt>
                <dd><a href={`mailto:${mail}`}>{mail}</a>{phone && <><br /><span className="small muted">{phone}</span></>}</dd>
              </div>
            ))}
          </dl>
          <div>
            <Link className="more" to={lp('/ansprechpartner')}>{t.perRegion}</Link>
          </div>
        </section>

        <section className="card stack" aria-labelledby={`${id}-form`}>
          <h2 id={`${id}-form`}>{t.formTitle}</h2>
          {sent ? (
            <p className="notice" role="status">{t.sent}</p>
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
              <div><button className="btn btn-cta" type="submit">{t.send}</button></div>
            </form>
          )}
        </section>
      </div>
    </>
  )
}
