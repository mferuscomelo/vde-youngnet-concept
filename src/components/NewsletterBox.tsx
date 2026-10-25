import { useId, useState, type FormEvent } from 'react'
import { useT } from '../i18n'
import { common } from '../i18n/common'
import { REGIONS, taxonomy } from '../i18n/taxonomy'

/** Demo only: shows a confirmation and stores nothing. */
export function NewsletterBox({ compact = false }: { compact?: boolean }) {
  const t = useT(common).newsletter
  const tx = useT(taxonomy)
  const id = useId()
  const [done, setDone] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }
  if (done) return <p className="notice notice-success" role="status">{t.done}</p>
  return (
    <form onSubmit={onSubmit} className="stack" style={{ gap: 'var(--space-3)' }} aria-labelledby={`${id}-h`}>
      <div>
        <h2 id={`${id}-h`} style={compact ? { fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '.04em', color: 'var(--color-text-muted)' } : undefined}>{t.title}</h2>
        <p className={compact ? 'small' : 'muted'}>{t.text}</p>
      </div>
      <div className="field">
        <label htmlFor={`${id}-email`}>{t.email}</label>
        <input id={`${id}-email`} type="email" required autoComplete="email" />
      </div>
      {!compact && (
        <div className="form-grid two">
          <fieldset className="field">
            <legend>{t.topics}</legend>
            {Object.entries(tx.audience).map(([k, v]) => (
              <label key={k} className="checkbox"><input type="checkbox" name="aud" value={k} /> {v}</label>
            ))}
            {Object.entries(tx.goal).map(([k, v]) => (
              <label key={k} className="checkbox"><input type="checkbox" name="goal" value={k} /> {v}</label>
            ))}
          </fieldset>
          <div className="field">
            <label htmlFor={`${id}-region`}>{t.region}</label>
            <select id={`${id}-region`} defaultValue="">
              <option value="">{t.allRegions}</option>
              {REGIONS.map((r) => <option key={r} value={r}>{tx.region[r]}</option>)}
            </select>
          </div>
        </div>
      )}
      <div><button className="btn btn-primary" type="submit">{t.submit}</button></div>
    </form>
  )
}
