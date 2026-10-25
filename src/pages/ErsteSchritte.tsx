import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { fmt, useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { onboarding } from '../i18n/onboarding'
import { loadJSON, saveJSON, storageAvailable } from '../lib/storage'

type Track = 'students' | 'yp'
type Saved = { track: Track; done: string[] }

export default function ErsteSchritte() {
  const t = useT(onboarding)
  const c = useT(common)
  const lp = useLp()
  const [canStore] = useState(storageAvailable)
  const [state, setState] = useState<Saved>(() => loadJSON<Saved>('onboarding', { track: 'students', done: [] }))
  useEffect(() => { saveJSON('onboarding', state) }, [state])

  const items = t.tracks[state.track]
  const done = items.filter((i) => state.done.includes(i.id)).length
  const pct = Math.round((done / items.length) * 100)

  const toggle = (id: string) =>
    setState((s) => ({ ...s, done: s.done.includes(id) ? s.done.filter((x) => x !== id) : [...s.done, id] }))

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      {!canStore && <p className="notice notice-warning">{c.storageOff}</p>}

      <div className="tabs" role="tablist" aria-label={t.trackLabel}>
        {(['students', 'yp'] as Track[]).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            className="tab"
            id={`tab-${k}`}
            aria-selected={state.track === k}
            aria-controls="onboarding-panel"
            onClick={() => setState((s) => ({ ...s, track: k }))}
          >
            {k === 'students' ? `🎓 ${t.students}` : `💼 ${t.yp}`}
          </button>
        ))}
      </div>

      <div id="onboarding-panel" role="tabpanel" aria-labelledby={`tab-${state.track}`} className="stack prose">
        <div className="stack" style={{ gap: 'var(--space-2)' }}>
          <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={done} aria-label={fmt(t.progress, { done, total: items.length })}>
            <span style={{ width: `${pct}%` }} />
          </div>
          <p className="small muted" aria-live="polite" style={{ margin: 0 }}>
            {done === items.length ? t.doneAll : fmt(t.progress, { done, total: items.length })}
          </p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-3)' }}>
          {items.map((i) => {
            const checked = state.done.includes(i.id)
            return (
              <li key={i.id} className={`card ${checked ? 'card-muted' : ''}`}>
                <label className="checkbox" style={{ cursor: 'pointer' }}>
                  <input type="checkbox" checked={checked} onChange={() => toggle(i.id)} />
                  <span>
                    <span className="badge badge-neutral">{i.day}</span>{' '}
                    <strong style={checked ? { textDecoration: 'line-through' } : undefined}>{i.title}</strong>
                    <span className="small muted" style={{ display: 'block' }}>{i.text}</span>
                  </span>
                </label>
                <div style={{ paddingLeft: 28, marginTop: 'var(--space-1)' }}>
                  <Link to={lp(i.to)} className="small">{i.link} →</Link>
                </div>
              </li>
            )
          })}
        </ul>

        <div>
          <button type="button" className="btn btn-sm" onClick={() => setState((s) => ({ ...s, done: [] }))}>↺ {t.reset}</button>
        </div>
      </div>
    </>
  )
}
