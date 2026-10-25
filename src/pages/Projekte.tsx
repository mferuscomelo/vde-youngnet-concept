import { useState, type FormEvent } from 'react'
import { AudienceBadge, PageHeader } from '../components/Badges'
import { PROJECTS } from '../data/projects'
import { fmt, useLang, useT } from '../i18n'
import { projects } from '../i18n/projects'

function SubmitProjectForm({ tagKeys }: { tagKeys: string[] }) {
  const t = useT(projects)
  const [done, setDone] = useState(false)
  const req = <span className="muted small"> ({t.form.required})</span>
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }
  if (done)
    return (
      <div className="stack">
        <p className="notice" role="status">{t.form.done}</p>
        <button type="button" className="btn" onClick={() => setDone(false)}>{t.form.again}</button>
      </div>
    )
  return (
    <form onSubmit={onSubmit} className="stack">
      <div className="form-grid two">
        <div className="field"><label htmlFor="pr-name">{t.form.name}{req}</label><input id="pr-name" type="text" required /></div>
        <div className="field"><label htmlFor="pr-team">{t.form.team}</label><input id="pr-team" type="text" /></div>
        <fieldset className="field span-2">
          <legend>{t.form.tags}</legend>
          <div className="row">
            {tagKeys.map((k) => <label key={k} className="checkbox"><input type="checkbox" name="tags" value={k} /> {t.tags[k]}</label>)}
          </div>
        </fieldset>
        <div className="field span-2"><label htmlFor="pr-text">{t.form.text}{req}</label><textarea id="pr-text" required /></div>
        <div className="field"><label htmlFor="pr-link">{t.form.link}</label><input id="pr-link" type="url" placeholder="https://" /></div>
        <div className="field"><label htmlFor="pr-contact">{t.form.contact}{req}</label><input id="pr-contact" type="email" required autoComplete="email" /></div>
      </div>
      <div><button type="submit" className="btn btn-cta">{t.form.submit}</button></div>
    </form>
  )
}

export default function Projekte() {
  const t = useT(projects)
  const lang = useLang()
  const [tag, setTag] = useState('')
  const tagKeys = Object.keys(t.tags)
  const list = PROJECTS.filter((p) => !tag || p.tags.includes(tag))

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />

      <fieldset className="field">
        <legend>{t.filter}</legend>
        <div className="chips">
          <button type="button" className="chip" aria-pressed={tag === ''} onClick={() => setTag('')}>{t.allTags}</button>
          {tagKeys.map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={tag === k} onClick={() => setTag(tag === k ? '' : k)}>{t.tags[k]}</button>
          ))}
        </div>
      </fieldset>
      <p role="status" style={{ fontWeight: 'var(--fw-medium)', marginTop: 'var(--space-5)' }}>{fmt(t.results, { n: list.length })}</p>

      <ul className="grid" style={{ listStyle: 'none', padding: 0 }}>
        {list.map((p) => (
          <li key={p.id} className="event-card">
            <div className={`cover cover-${p.cover}`} aria-hidden="true">{p.tags.map((k) => t.tags[k]).join(' | ')}</div>
            <div className="body">
              <div className="badges">
                <AudienceBadge audience={p.audience} />
                
              </div>
              <p className="meta-line"><span>{p.team}</span></p>
              <h3 className="panel-title">{lang === 'en' ? p.title_en : p.title_de}</h3>
              <p style={{ margin: 0 }}>{lang === 'en' ? p.text_en : p.text_de}</p>
              <div className="badges">
                {p.tags.map((k) => <span key={k} className="badge badge-neutral">{t.tags[k]}</span>)}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="section card" aria-labelledby="pr-submit">
        <h2 id="pr-submit">{t.form.title}</h2>
        <p>{t.form.intro}</p>
        <SubmitProjectForm tagKeys={tagKeys} />
      </section>
    </>
  )
}
