import { useState, type FormEvent } from 'react'
import { PageHeader, SampleBadge } from '../components/Badges'
import { JOBS } from '../data/jobs'
import { fmt, useLang, useT } from '../i18n'
import { common } from '../i18n/common'
import { jobs } from '../i18n/jobs'
import { REGIONS, taxonomy } from '../i18n/taxonomy'

const TYPES = ['praktikum', 'werkstudent', 'abschlussarbeit', 'einstieg']
const FIELDS = ['energie', 'embedded', 'automatisierung', 'nachrichten', 'medizin']

function SubmitJobForm() {
  const t = useT(jobs)
  const c = useT(common)
  const [done, setDone] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }
  const req = <span className="muted small"> ({t.form.required})</span>
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
        <div className="field"><label htmlFor="job-company">{t.form.company}{req}</label><input id="job-company" type="text" required /></div>
        <div className="field"><label htmlFor="job-title">{t.form.jobTitle}{req}</label><input id="job-title" type="text" required /></div>
        <div className="field">
          <label htmlFor="job-type">{t.form.type}{req}</label>
          <select id="job-type" required defaultValue="">
            <option value="" disabled>–</option>
            {TYPES.map((k) => <option key={k} value={k}>{t.type[k]}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="job-field">{t.form.field}</label>
          <select id="job-field" defaultValue="">
            <option value="">–</option>
            {FIELDS.map((k) => <option key={k} value={k}>{t.field[k]}</option>)}
          </select>
        </div>
        <div className="field"><label htmlFor="job-city">{t.form.city}{req}</label><input id="job-city" type="text" required /></div>
        <div className="field"><label htmlFor="job-link">{t.form.link}</label><input id="job-link" type="url" placeholder="https://" /></div>
        <div className="field"><label htmlFor="job-contact">{t.form.contact}{req}</label><input id="job-contact" type="email" required autoComplete="email" /></div>
        <div className="field span-2"><label htmlFor="job-text">{t.form.text}</label><textarea id="job-text" /></div>
      </div>
      <div><button type="submit" className="btn btn-primary">{t.form.submit}</button></div>
    </form>
  )
}

export default function Jobs() {
  const t = useT(jobs)
  const tx = useT(taxonomy)
  const lang = useLang()
  const [type, setType] = useState<string[]>([])
  const [field, setField] = useState('')
  const [region, setRegion] = useState('')
  const toggle = (k: string) => setType((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]))
  const list = JOBS.filter((j) => (!type.length || type.includes(j.type)) && (!field || j.field === field) && (!region || j.region === region))

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <p className="notice notice-warning small">{t.sampleNote}</p>
      </PageHeader>

      <section aria-labelledby="job-filters" className="card card-muted stack">
        <h2 id="job-filters" className="visually-hidden">Filter</h2>
        <fieldset className="field">
          <legend>{t.filterType}</legend>
          <div className="chips">
            {TYPES.map((k) => (
              <button key={k} type="button" className="chip" aria-pressed={type.includes(k)} onClick={() => toggle(k)}>{t.type[k]}</button>
            ))}
          </div>
        </fieldset>
        <div className="form-grid two">
          <div className="field">
            <label htmlFor="f-field">{t.filterField}</label>
            <select id="f-field" value={field} onChange={(e) => setField(e.target.value)}>
              <option value="">{t.all}</option>
              {FIELDS.map((k) => <option key={k} value={k}>{t.field[k]}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-region">{t.filterRegion}</label>
            <select id="f-region" value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">{t.all}</option>
              {REGIONS.map((r) => <option key={r} value={r}>{tx.region[r]}</option>)}
            </select>
          </div>
        </div>
      </section>

      <div className="row-between section" style={{ marginTop: 'var(--space-5)' }}>
        <p role="status" style={{ margin: 0, fontWeight: 600 }}>{fmt(t.results, { n: list.length })}</p>
        {(type.length > 0 || field || region) && (
          <button type="button" className="btn btn-sm" onClick={() => { setType([]); setField(''); setRegion('') }}>{t.reset}</button>
        )}
      </div>

      {list.length === 0 ? (
        <p className="muted">{t.none}</p>
      ) : (
        <ul className="grid" style={{ listStyle: 'none', padding: 0, marginTop: 'var(--space-3)' }}>
          {list.map((j) => (
            <li key={j.id} className="card stack" style={{ gap: 'var(--space-2)' }}>
              <div className="row" style={{ gap: 6 }}>
                <span className="badge badge-neutral">{t.type[j.type]}</span>
                <SampleBadge />
              </div>
              <h3 style={{ margin: 0 }}>{lang === 'en' ? j.title_en : j.title_de}</h3>
              <p className="small muted" style={{ margin: 0 }}>{j.company} · 📍 {j.city} · {tx.region[j.region]}</p>
              <p className="small" style={{ margin: 0 }}>{lang === 'en' ? j.text_en : j.text_de}</p>
              <p className="small muted" style={{ margin: 0 }}>{t.field[j.field]}</p>
            </li>
          ))}
        </ul>
      )}

      <section className="section card" aria-labelledby="job-submit">
        <h2 id="job-submit">{t.form.title}</h2>
        <p className="muted">{t.form.intro}</p>
        <SubmitJobForm />
      </section>
    </>
  )
}
