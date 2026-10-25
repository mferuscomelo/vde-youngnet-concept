import { useState, type FormEvent } from 'react'
import { AudienceBadge, PageHeader, SampleBadge } from '../components/Badges'
import { PROJECTS } from '../data/projects'
import { fmt, useLang, useT } from '../i18n'
import { common } from '../i18n/common'
import { projects } from '../i18n/projects'

function SubmitProjectForm({ tagKeys }: { tagKeys: string[] }) {
  const t = useT(projects)
  const c = useT(common)
  const [done, setDone] = useState(false)
  const req = <span className="muted small"> ({t.form.required})</span>
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }
  if (done)
    return (
      <div className="stack">
        <p className="notice notice-success" role="status">{t.form.done}</p>
        <button type="button" className="btn" onClick={() => setDone(false)}>{t.form.again}</button>
      </div>
    )
  return (
    <form onSubmit={onSubmit} className="stack">
      <p className="notice notice-info small">{c.demoOnly}</p>
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
      <div><button type="submit" className="btn btn-primary">{t.form.submit}</button></div>
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
      <PageHeader title={t.title} lead={t.lead}>
        <p className="notice notice-warning small">{t.sampleNote}</p>
      </PageHeader>

      <fieldset className="field">
        <legend>{t.filter}</legend>
        <div className="chips">
          <button type="button" className="chip" aria-pressed={tag === ''} onClick={() => setTag('')}>{t.allTags}</button>
          {tagKeys.map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={tag === k} onClick={() => setTag(tag === k ? '' : k)}>{t.tags[k]}</button>
          ))}
        </div>
      </fieldset>
      <p role="status" style={{ fontWeight: 600, marginTop: 'var(--space-4)' }}>{fmt(t.results, { n: list.length })}</p>

      <ul className="grid" style={{ listStyle: 'none', padding: 0 }}>
        {list.map((p) => (
          <li key={p.id} className="card event-card">
            <div className={`cover cover-${p.cover}`} aria-hidden="true">{p.tags.map((k) => t.tags[k]).join(' · ')}</div>
            <div className="body">
              <div className="row" style={{ gap: 6 }}>
                <AudienceBadge audience={p.audience} />
                <SampleBadge />
              </div>
              <h3>{lang === 'en' ? p.title_en : p.title_de}</h3>
              <p className="small" style={{ margin: 0 }}>{lang === 'en' ? p.text_en : p.text_de}</p>
              <p className="small muted" style={{ margin: 0 }}>{p.team}</p>
              <div className="row" style={{ gap: 6 }}>
                {p.tags.map((k) => <span key={k} className="badge badge-neutral">#{t.tags[k]}</span>)}
              </div>
              <p className="small" style={{ margin: 0, marginTop: 'auto' }}>
                <a href="#" onClick={(e) => e.preventDefault()} aria-disabled="true">{t.link}</a> <span className="muted">{t.linkNote}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <section className="section card" aria-labelledby="pr-submit">
        <h2 id="pr-submit">{t.form.title}</h2>
        <p className="muted">{t.form.intro}</p>
        <SubmitProjectForm tagKeys={tagKeys} />
      </section>
    </>
  )
}
