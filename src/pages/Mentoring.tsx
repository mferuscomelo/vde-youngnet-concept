import { useState, type FormEvent } from 'react'
import { PageHeader } from '../components/Badges'
import { fmt, useT } from '../i18n'
import { common } from '../i18n/common'
import { mentoring } from '../i18n/mentoring'

export default function Mentoring() {
  const t = useT(mentoring)
  const c = useT(common)
  // Session-only: lives in React state, gone on reload.
  const [done, setDone] = useState<{ name: string; role: 'mentee' | 'mentor' } | null>(null)
  const req = <span className="muted small"> ({t.required})</span>

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setDone({ name: String(data.get('name') ?? ''), role: data.get('role') === 'mentor' ? 'mentor' : 'mentee' })
  }

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />

      <section aria-labelledby="m-pairs">
        <h2 id="m-pairs">{t.pairsTitle}</h2>
        <div className="grid-2">
          {t.pairs.map((p) => (
            <div key={p.from} className="card stack" style={{ gap: 'var(--space-2)' }}>
              <h3 style={{ margin: 0 }}>{p.from} <span aria-hidden="true">↔</span><span className="visually-hidden"> + </span> {p.to}</h3>
              <p style={{ margin: 0 }}>{p.text}</p>
            </div>
          ))}
        </div>
        <p className="muted small" style={{ marginTop: 'var(--space-3)' }}>{t.matchNote}</p>
      </section>

      <div className="grid-2 section">
        <section aria-labelledby="m-time">
          <h2 id="m-time">{t.timeTitle}</h2>
          <dl className="kv">
            {t.time.map(([k, v]) => (
              <div key={k} style={{ display: 'contents' }}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="m-steps">
          <h2 id="m-steps">{t.stepsTitle}</h2>
          <ol className="steps">
            {t.steps.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </section>
      </div>

      <section className="section card" aria-labelledby="m-form">
        <h2 id="m-form">{t.formTitle}</h2>
        {done ? (
          <div className="stack">
            <p className="notice notice-success" role="status">{fmt(t.done, { name: done.name, role: done.role === 'mentor' ? t.mentor : t.mentee })}</p>
            <button type="button" className="btn" onClick={() => setDone(null)}>{t.again}</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="stack">
            <p className="notice notice-info small">{c.demoOnly}</p>
            <fieldset className="field">
              <legend>{t.role}{req}</legend>
              <label className="checkbox"><input type="radio" name="role" value="mentee" required defaultChecked /> {t.roleMentee}</label>
              <label className="checkbox"><input type="radio" name="role" value="mentor" /> {t.roleMentor}</label>
            </fieldset>
            <div className="form-grid two">
              <div className="field"><label htmlFor="m-name">{t.name}{req}</label><input id="m-name" name="name" type="text" required autoComplete="given-name" /></div>
              <div className="field"><label htmlFor="m-email">{t.email}{req}</label><input id="m-email" name="email" type="email" required autoComplete="email" /></div>
              <div className="field">
                <label htmlFor="m-stage">{t.stage}{req}</label>
                <select id="m-stage" name="stage" required defaultValue="">
                  <option value="" disabled>–</option>
                  {Object.entries(t.stages).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div className="field"><label htmlFor="m-field">{t.field}</label><input id="m-field" name="field" type="text" /></div>
              <div className="field span-2"><label htmlFor="m-goals">{t.goals}</label><textarea id="m-goals" name="goals" /></div>
            </div>
            <label className="checkbox"><input type="checkbox" name="online" defaultChecked /> {t.online}</label>
            <div><button type="submit" className="btn btn-primary">{t.submit}</button></div>
          </form>
        )}
      </section>
    </>
  )
}
