import { useRef, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { EventCard } from '../components/EventBits'
import { fmt, useLang, useLp, useT, type Lang } from '../i18n'
import { submitT } from '../i18n/submit'
import { AUDIENCES, FORMATS, GOALS, TYPES, taxonomy } from '../i18n/taxonomy'
import { useDemo } from '../lib/demoStore'
import { todayISO, type Audience, type HubEvent } from '../lib/events'
import { PLACES } from '../lib/places'

type Draft = {
  title: string
  start: string
  end: string
  audience: Audience | ''
  type: string
  format: string
  location: string
  goals: string[]
  description: string
  organizer: string
  priceMember: string
  priceNon: string
  language: string
  cover: number
}

const EMPTY: Draft = {
  title: '', start: '', end: '', audience: '', type: 'stammtisch', format: 'praesenz', location: '', goals: [],
  description: '', organizer: '', priceMember: '', priceNon: '', language: 'de', cover: 1,
}

const REGION_OF: Record<string, string> = {
  hamburg: 'nord', hannover: 'nord', bremen: 'nord', kiel: 'nord', rostock: 'nord',
  berlin: 'ost', dresden: 'ost', leipzig: 'ost', magdeburg: 'ost', erfurt: 'ost', ilmenau: 'ost',
  aachen: 'west', koeln: 'west', dortmund: 'west',
  darmstadt: 'mitte', frankfurt: 'mitte', kassel: 'mitte', saarbruecken: 'mitte',
  karlsruhe: 'suedwest', stuttgart: 'suedwest', heidelberg: 'suedwest', freiburg: 'suedwest',
  muenchen: 'sued', nuernberg: 'sued', wuerzburg: 'sued',
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function toEvent(d: Draft, id: string, lang: Lang, fallbackTitle: string): HubEvent {
  const price = (s: string) => (s.trim() === '' ? 0 : Math.max(0, Number(s)))
  const location = d.format === 'online' ? 'online' : d.format === 'dezentral' ? 'alle-bvs' : d.location || null
  const t = d.title.trim() || fallbackTitle
  const start = d.start || todayISO()
  return {
    id, slug: `${slugify(t) || 'event'}-${start}-${id.slice(-4)}`,
    title_de: t, title_en: t,
    description_de: d.description, description_en: d.description,
    start, end: d.end && d.end >= start ? d.end : start,
    format: d.format, type: d.type, goals: d.goals.length ? d.goals : ['networking'],
    audience: (d.audience || 'all') as Audience,
    location, region: d.format === 'praesenz' ? REGION_OF[d.location] ?? null : 'bundesweit', bv: null,
    fachgesellschaft: null, organizer: d.organizer || '–',
    price_member: price(d.priceMember), price_nonmember: price(d.priceNon),
    language: d.language || lang, status: 'pending', source: 'submitted', cover: d.cover, added: todayISO(),
  }
}

export function formatDuration(ms: number, t: { minutes: string; minute: string; seconds: string; second: string }): string {
  const s = Math.max(1, Math.round(ms / 1000))
  if (s === 1) return t.second
  if (s < 60) return fmt(t.seconds, { n: s })
  const m = Math.round(s / 60)
  return m === 1 ? t.minute : fmt(t.minutes, { n: m })
}

function Done({ id }: { id: string }) {
  const t = useT(submitT)
  const lp = useLp()
  const { events, timing, approve } = useDemo()
  const e = events.find((x) => x.id === id)
  if (!e) return null
  const tm = timing[id]
  const published = e.status === 'published'
  return (
    <div className="stack" style={{ maxWidth: 640 }}>
      {published ? (
        <div className="notice notice-success stack" role="status">
          <h2 style={{ margin: 0 }}>✓ {t.done.publishedTitle}</h2>
          {tm?.approvedAt && (
            <p className="stat" style={{ fontSize: 'clamp(1.35rem, 4vw, 2rem)', margin: 0 }}>
              {fmt(t.done.publishedIn, { time: formatDuration(tm.approvedAt - tm.submittedAt, t) })}
            </p>
          )}
          <p className="small" style={{ margin: 0 }}>{t.done.publishedText}</p>
        </div>
      ) : (
        <div className="notice notice-info stack" role="status">
          <h2 style={{ margin: 0 }}>⏳ {e.status === 'changes' ? t.done.changes : t.done.title}</h2>
          <p style={{ margin: 0 }}>{t.done.text}</p>
        </div>
      )}
      <EventCard event={e} showStatus />
      <div className="row">
        {!published && <button type="button" className="btn btn-success" onClick={() => approve(id)}>✓ {t.done.approveHere}</button>}
        {!published && <Link className="btn" to={lp('/organizer')}>{t.done.toQueue}</Link>}
        {published && <Link className="btn btn-primary" to={lp(`/events/${e.slug}`)}>{t.done.view}</Link>}
        <Link className="btn" to={lp('/einreichen')}>{t.done.another}</Link>
      </div>
    </div>
  )
}

export default function Submit() {
  const t = useT(submitT)
  const tx = useT(taxonomy)
  const lang = useLang()
  const { submit } = useDemo()
  const [params, setParams] = useSearchParams()
  const [d, setD] = useState<Draft>(EMPTY)
  const [tried, setTried] = useState(false)
  const startedAt = useRef<number | null>(null)
  const doneId = params.get('done')

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => {
    startedAt.current ??= Date.now()
    setD((x) => ({ ...x, [k]: v }))
  }
  const invalid = {
    title: !d.title.trim(),
    start: !d.start,
    audience: !d.audience,
    location: d.format === 'praesenz' && !d.location,
    description: !d.description.trim(),
    organizer: !d.organizer.trim(),
  }
  const hasErrors = Object.values(invalid).some(Boolean)
  const err = (k: keyof typeof invalid) => (tried && invalid[k] ? { 'aria-invalid': true as const, 'aria-describedby': `${k}-err` } : {})
  const errMsg = (k: keyof typeof invalid) => tried && invalid[k] && <span id={`${k}-err`} className="small" style={{ color: 'var(--color-danger)' }}>{t.required}</span>

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    setTried(true)
    if (hasErrors) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }
    const id = `s${Date.now().toString(36)}`
    submit(toEvent(d, id, lang, t.placeholderTitle), startedAt.current ?? Date.now())
    setD(EMPTY)
    setTried(false)
    startedAt.current = null
    setParams({ done: id })
  }

  if (doneId) {
    return (
      <>
        <PageHeader title={t.title} />
        <Done id={doneId} />
      </>
    )
  }

  const preview = toEvent(d, 'preview', lang, t.placeholderTitle)
  const req = <span aria-hidden="true" style={{ color: 'var(--color-danger)' }}> *</span>

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      <div className="grid-2 wide-left">
        <form onSubmit={onSubmit} noValidate className="stack" aria-labelledby="form-h">
          <h2 id="form-h" className="visually-hidden">{t.form}</h2>
          {tried && hasErrors && <p className="notice notice-warning" role="alert">{t.errors}</p>}

          <div className="field">
            <label htmlFor="s-title">1. {t.f.title}{req}</label>
            <input id="s-title" type="text" value={d.title} onChange={(e) => set('title', e.target.value)} required {...err('title')} />
            <span className="hint">{t.f.titleHint}</span>{errMsg('title')}
          </div>

          <div className="form-grid two">
            <div className="field">
              <label htmlFor="s-start">2. {t.f.start}{req}</label>
              <input id="s-start" type="date" min={todayISO()} value={d.start} onChange={(e) => set('start', e.target.value)} required {...err('start')} />
              {errMsg('start')}
            </div>
            <div className="field">
              <label htmlFor="s-end">{t.f.end}</label>
              <input id="s-end" type="date" min={d.start || todayISO()} value={d.end} onChange={(e) => set('end', e.target.value)} />
            </div>
          </div>

          <fieldset className="field" {...(tried && invalid.audience ? { 'aria-describedby': 'audience-err' } : {})}>
            <legend>3. {t.f.audience}{req}</legend>
            <span className="hint">{t.f.audienceHint}</span>
            <div className="chips" role="radiogroup">
              {AUDIENCES.map((a) => (
                <label key={a} className="chip" style={{ cursor: 'pointer' }}>
                  <input type="radio" name="audience" value={a} checked={d.audience === a} onChange={() => set('audience', a)} required /> {tx.audience[a]}
                </label>
              ))}
            </div>
            {errMsg('audience')}
          </fieldset>

          <div className="form-grid two">
            <div className="field">
              <label htmlFor="s-type">4. {t.f.type}</label>
              <select id="s-type" value={d.type} onChange={(e) => set('type', e.target.value)}>
                {TYPES.map((x) => <option key={x} value={x}>{tx.type[x]}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="s-format">5. {t.f.format}</label>
              <select id="s-format" value={d.format} onChange={(e) => set('format', e.target.value)}>
                {FORMATS.map((x) => <option key={x} value={x}>{tx.format[x]}</option>)}
              </select>
            </div>
          </div>

          {d.format === 'praesenz' && (
            <div className="field">
              <label htmlFor="s-loc">6. {t.f.location}{req}</label>
              <select id="s-loc" value={d.location} onChange={(e) => set('location', e.target.value)} required {...err('location')}>
                <option value="">–</option>
                {Object.entries(PLACES).sort((a, b) => a[1].label.localeCompare(b[1].label)).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}
              </select>
              {errMsg('location')}
            </div>
          )}

          <fieldset className="field">
            <legend>7. {t.f.goals}</legend>
            <div className="chips">
              {GOALS.map((g) => (
                <label key={g} className="checkbox chip" style={{ cursor: 'pointer', alignItems: 'center' }}>
                  <input type="checkbox" checked={d.goals.includes(g)} onChange={(e) => set('goals', e.target.checked ? [...d.goals, g] : d.goals.filter((x) => x !== g))} /> {tx.goal[g]}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="s-desc">8. {t.f.description}{req}</label>
            <textarea id="s-desc" value={d.description} onChange={(e) => set('description', e.target.value)} required maxLength={600} {...err('description')} />
            <span className="hint">{t.f.descriptionHint}</span>{errMsg('description')}
          </div>

          <div className="form-grid two">
            <div className="field">
              <label htmlFor="s-org">9. {t.f.organizer}{req}</label>
              <input id="s-org" type="text" value={d.organizer} onChange={(e) => set('organizer', e.target.value)} required {...err('organizer')} />
              {errMsg('organizer')}
            </div>
            <div className="field">
              <label htmlFor="s-lang">{t.f.language}</label>
              <select id="s-lang" value={d.language} onChange={(e) => set('language', e.target.value)}>
                {Object.entries(tx.language).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          <fieldset className="field">
            <legend>10. {t.f.prices}</legend>
            <div className="form-grid two">
              <div className="field">
                <label htmlFor="s-pm" className="small">{t.f.priceMember}</label>
                <input id="s-pm" type="number" min={0} inputMode="numeric" value={d.priceMember} onChange={(e) => set('priceMember', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="s-pn" className="small">{t.f.priceNon}</label>
                <input id="s-pn" type="number" min={0} inputMode="numeric" value={d.priceNon} onChange={(e) => set('priceNon', e.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset className="field">
            <legend>{t.f.cover}</legend>
            <span className="hint">{t.f.coverHint}</span>
            <div className="row">
              {[1, 2, 3, 4].map((n) => (
                <label key={n} style={{ cursor: 'pointer' }}>
                  <input type="radio" name="cover" className="visually-hidden" checked={d.cover === n} onChange={() => set('cover', n)} />
                  <span className={`cover-${n}`} style={{
                    display: 'block', width: 64, height: 40, borderRadius: 'var(--radius-md)',
                    outline: d.cover === n ? '3px solid var(--color-text)' : '1px solid var(--color-border)', outlineOffset: 2,
                  }} />
                  <span className="visually-hidden">{fmt(t.f.coverN, { n })}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <button type="submit" className="btn btn-primary">{t.submit}</button>
          </div>
          <p className="small muted">{t.storedLocally}</p>
        </form>

        <aside aria-labelledby="pv-h" className="stack">
          <div style={{ position: 'sticky', top: 48 }} className="stack">
            <h2 id="pv-h" style={{ fontSize: '1.125rem', margin: 0 }}>{t.preview}</h2>
            <p className="small muted" style={{ margin: 0 }}>{t.previewHint}</p>
            <div aria-live="polite"><EventCard event={preview} preview /></div>
            {d.description && <p className="small card">{d.description}</p>}
          </div>
        </aside>
      </div>
    </>
  )
}
