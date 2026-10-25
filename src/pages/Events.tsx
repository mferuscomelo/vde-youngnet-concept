import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { AudienceBadge, PageHeader, SampleBadge } from '../components/Badges'
import { EventCard, useLocationLabel } from '../components/EventBits'
import { MapView } from '../components/MapView'
import { fmt, useLang, useLp, useT, type Lang } from '../i18n'
import { eventsT } from '../i18n/events'
import { AUDIENCES, FACHGESELLSCHAFTEN, FORMATS, GOALS, REGIONS, TYPES, taxonomy } from '../i18n/taxonomy'
import { downloadICS, feedUrl, icsForEvents, outlookSubscribeUrl, webcalUrl } from '../lib/calendar'
import { useDemo } from '../lib/demoStore'
import {
  activeFilterCount, applyFilters, coords, filtersFromParams, formatDateRange, isPast, matches, sortEvents, title, todayISO,
  type Filters, type HubEvent,
} from '../lib/events'
import { PLACES } from '../lib/places'
import { BV_OPTIONS } from '../lib/bvOptions'

type Origin = { lat: number; lng: number; label: string }

function useOrigin(params: URLSearchParams): Origin | null {
  const ort = params.get('ort')
  const ll = params.get('ll')
  if (ort && PLACES[ort]) return { ...PLACES[ort], label: PLACES[ort].label }
  if (ll) {
    const [lat, lng] = ll.split(',').map(Number)
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng, label: 'GPS' }
  }
  return null
}

function ChipGroup({ label, options, labels, value, onChange }: {
  label: string; options: readonly string[]; labels: Record<string, string>; value: string[]; onChange: (v: string[]) => void
}) {
  return (
    <fieldset className="field">
      <legend>{label}</legend>
      <div className="chips">
        {options.map((o) => {
          const on = value.includes(o)
          return (
            <button key={o} type="button" className="chip" aria-pressed={on} onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}>
              {labels[o] ?? o}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function OriginPicker({ params, setParams }: { params: URLSearchParams; setParams: (p: URLSearchParams) => void }) {
  const t = useT(eventsT)
  const id = useId()
  const [geoFail, setGeoFail] = useState(false)
  const set = (k: 'ort' | 'll', v: string) => {
    const n = new URLSearchParams(params)
    n.delete('ort'); n.delete('ll')
    if (v) n.set(k, v)
    setParams(n)
  }
  const geo = () => {
    if (!navigator.geolocation) return setGeoFail(true)
    navigator.geolocation.getCurrentPosition(
      (p) => set('ll', `${p.coords.latitude.toFixed(2)},${p.coords.longitude.toFixed(2)}`),
      () => setGeoFail(true),
      { timeout: 8000 },
    )
  }
  return (
    <div className="field">
      <label htmlFor={id}>{t.origin}</label>
      <div className="row" style={{ flexWrap: 'nowrap' }}>
        <select id={id} value={params.get('ort') ?? ''} onChange={(e) => set('ort', e.target.value)}>
          <option value="">{params.get('ll') ? 'GPS' : t.originPick}</option>
          {Object.entries(PLACES).sort((a, b) => a[1].label.localeCompare(b[1].label)).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}
        </select>
        <button type="button" className="btn btn-sm" onClick={geo} title={t.originGeo} aria-label={t.originGeo}>⌖</button>
      </div>
      {geoFail && <span className="hint" role="status">{t.originGeoFail}</span>}
    </div>
  )
}

function FilterPanel({ f, update, params, setParams }: {
  f: Filters; update: (p: Partial<Filters>) => void; params: URLSearchParams; setParams: (p: URLSearchParams) => void
}) {
  const t = useT(eventsT)
  const tx = useT(taxonomy)
  const n = activeFilterCount(f)
  const regionLabels = { ...tx.region, ...Object.fromEntries(BV_OPTIONS.map((b) => [b.id, b.label])) }
  return (
    <details className="filter-panel" open={n > 0 ? true : undefined}>
      <summary>
        {t.filters}{n > 0 && <>&nbsp;<span className="badge badge-neutral">{fmt(t.filtersActive, { n })}</span></>}
      </summary>
      <div className="stack">
        <div className="filters">
          <ChipGroup label={t.f.aud} options={AUDIENCES.filter((a) => a !== 'all')} labels={tx.audience} value={f.aud} onChange={(aud) => update({ aud })} />
          <ChipGroup label={t.f.format} options={FORMATS} labels={tx.format} value={f.format} onChange={(format) => update({ format })} />
          <ChipGroup label={t.f.goal} options={GOALS} labels={tx.goal} value={f.goal} onChange={(goal) => update({ goal })} />
        </div>
        <ChipGroup label={t.f.type} options={TYPES} labels={tx.type} value={f.type} onChange={(type) => update({ type })} />
        <div className="filters">
          <div className="field">
            <label htmlFor="f-region">{t.f.region}</label>
            <select id="f-region" value={f.region[0] ?? ''} onChange={(e) => update({ region: e.target.value ? [e.target.value] : [] })}>
              <option value="">{t.f.any}</option>
              <optgroup label={t.f.regionGroup}>
                {REGIONS.map((r) => <option key={r} value={r}>{tx.region[r]}</option>)}
              </optgroup>
              <optgroup label={t.f.bvGroup}>
                {BV_OPTIONS.map((b) => <option key={b.id} value={b.id}>{regionLabels[b.id]}</option>)}
              </optgroup>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-fg">{t.f.fg}</label>
            <select id="f-fg" value={f.fg[0] ?? ''} onChange={(e) => update({ fg: e.target.value ? [e.target.value] : [] })}>
              <option value="">{t.f.any}</option>
              {FACHGESELLSCHAFTEN.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-from">{t.f.from}</label>
            <input id="f-from" type="date" value={f.from} onChange={(e) => update({ from: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="f-to">{t.f.to}</label>
            <input id="f-to" type="date" value={f.to} onChange={(e) => update({ to: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="f-price">{t.f.price}</label>
            <select id="f-price" value={f.price} onChange={(e) => update({ price: e.target.value as Filters['price'] })}>
              <option value="">{t.f.priceAny}</option>
              <option value="free">{t.f.priceFree}</option>
              <option value="paid">{t.f.pricePaid}</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-lang">{t.f.lang}</label>
            <select id="f-lang" value={f.lang[0] ?? ''} onChange={(e) => update({ lang: e.target.value ? [e.target.value] : [] })}>
              <option value="">{t.f.any}</option>
              {Object.entries(tx.language).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <OriginPicker params={params} setParams={setParams} />
        </div>
        {n > 0 && (
          <div>
            <button type="button" className="btn btn-sm" onClick={() => {
              const keep = new URLSearchParams()
              for (const k of ['view', 'tab', 'm', 'ort', 'll', 'sort']) { const v = params.get(k); if (v) keep.set(k, v) }
              setParams(keep)
            }}>✕ {t.reset}</button>
          </div>
        )}
      </div>
    </details>
  )
}

function parseMonth(m: string | null): [number, number] | null {
  if (!m || !/^\d{4}-\d{2}$/.test(m)) return null
  const [y, mo] = m.split('-').map(Number)
  return [y, mo - 1]
}

function CalendarView({ events, params, setParams }: { events: HubEvent[]; params: URLSearchParams; setParams: (p: URLSearchParams) => void }) {
  const t = useT(eventsT)
  const lang = useLang()
  const lp = useLp()
  const today = todayISO()
  const first = events[0]?.start ?? today
  const [y, m] = parseMonth(params.get('m')) ?? [Number(first.slice(0, 4)), Number(first.slice(5, 7)) - 1]
  const setMonth = (delta: number) => {
    const d = new Date(y, m + delta, 1)
    const n = new URLSearchParams(params)
    n.set('m', `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
    setParams(n)
  }
  const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const start = new Date(y, m, 1)
  const offset = (start.getDay() + 6) % 7 // Monday first
  const gridStart = new Date(y, m, 1 - offset)
  const weeks: Date[][] = []
  for (let w = 0; w < 6; w++) {
    const row = Array.from({ length: 7 }, (_, i) => new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + w * 7 + i))
    if (w > 3 && row[0].getMonth() !== m) break
    weeks.push(row)
  }
  const monthLabel = start.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { month: 'long', year: 'numeric' })
  const monthKey = `${y}-${String(m + 1).padStart(2, '0')}`
  const outside = events.filter((e) => e.end.slice(0, 7) < monthKey || e.start.slice(0, 7) > monthKey).length
  return (
    <div className="stack">
      <div className="row-between">
        <button type="button" className="btn btn-sm" onClick={() => setMonth(-1)} aria-label={t.prevMonth}>←</button>
        <h2 aria-live="polite" style={{ margin: 0, fontSize: '1.25rem' }}>{monthLabel}</h2>
        <button type="button" className="btn btn-sm" onClick={() => setMonth(1)} aria-label={t.nextMonth}>→</button>
      </div>
      <table className="cal">
        <caption className="visually-hidden">{monthLabel}</caption>
        <thead><tr>{t.weekdays.map((d) => <th key={d} scope="col">{d}</th>)}</tr></thead>
        <tbody>
          {weeks.map((row, i) => (
            <tr key={i}>
              {row.map((d) => {
                const key = iso(d)
                const dayEvents = events.filter((e) => e.start <= key && e.end >= key)
                return (
                  <td key={key} className={`${d.getMonth() !== m ? 'other' : ''} ${key === today ? 'today' : ''}`}>
                    <span className="day-num">{d.getDate()}</span>
                    {dayEvents.map((e) => (
                      <Link key={e.id} to={lp(`/events/${e.slug}`)} className={`aud-${e.audience}`} title={title(e, lang)}>
                        {title(e, lang)}
                      </Link>
                    ))}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {outside > 0 && <p className="small muted">{fmt(t.outsideMonth, { n: outside })}</p>}
    </div>
  )
}

function EventsMap({ events }: { events: HubEvent[] }) {
  const lang = useLang()
  const lp = useLp()
  const loc = useLocationLabel()
  const color: Record<string, string> = { students: 'var(--color-aud-students)', 'young-professionals': 'var(--color-aud-yp)', all: 'var(--color-aud-all)' }
  const points = events.flatMap((e) => {
    const c = coords(e)
    return c ? [{
      id: e.id, ...c, label: title(e, lang), color: color[e.audience],
      popup: (
        <div>
          <strong><Link to={lp(`/events/${e.slug}`)}>{title(e, lang)}</Link></strong><br />
          {formatDateRange(e, lang)} · {loc(e)}<br />
          <AudienceBadge audience={e.audience} />
        </div>
      ),
    }] : []
  })
  return <MapView points={points} missing={events.length - points.length} />
}

function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button type="button" className="btn btn-sm" onClick={async () => {
      try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000) } catch { window.prompt(label, text) }
    }}>
      <span role="status">{ok ? `✓ ${done}` : label}</span>
    </button>
  )
}

function Subscribe({ filtered, lang }: { filtered: HubEvent[]; lang: Lang }) {
  const t = useT(eventsT).abo
  const feeds = ['all', 'young-professionals', 'students'] as const
  return (
    <section id="abo" className="section card card-muted stack" aria-labelledby="abo-h">
      <h2 id="abo-h">📅 {t.title}</h2>
      <p className="muted">{t.text}</p>
      <div className="grid">
        {feeds.map((k) => {
          const url = feedUrl(k, lang)
          const name = `YoungNet Hub – ${t.feeds[k]}`
          return (
            <div key={k} className="card stack" style={{ gap: 'var(--space-2)' }}>
              <h3>{t.feeds[k]}</h3>
              <a className="btn btn-primary btn-sm" href={outlookSubscribeUrl(url, name)} target="_blank" rel="noopener noreferrer">{t.outlook}</a>
              <a className="btn btn-sm" href={webcalUrl(url)}>{t.webcal}</a>
              <CopyButton text={url} label={t.copy} done={t.copied} />
            </div>
          )
        })}
      </div>
      <p className="small muted">{t.howto}</p>
      <div className="stack" style={{ gap: 'var(--space-2)' }}>
        <h3>{t.filtered}</h3>
        <p className="small muted">{t.filteredText}</p>
        <div>
          <button type="button" className="btn btn-sm" disabled={!filtered.length}
            onClick={() => downloadICS('youngnet-hub-auswahl', icsForEvents(filtered, lang, 'YoungNet Hub (Konzept) – Auswahl'))}>
            ⬇ {fmt(t.filteredBtn, { n: filtered.length })}
          </button>
        </div>
      </div>
    </section>
  )
}

export default function Events() {
  const t = useT(eventsT)
  const tx = useT(taxonomy)
  const lang = useLang()
  const lp = useLp()
  const { published } = useDemo()
  const [params, setParams] = useSearchParams()
  const { hash } = useLocation()
  const f = filtersFromParams(params)
  const origin = useOrigin(params)
  const tab = params.get('tab') === 'archiv' ? 'archiv' : 'upcoming'
  const view = tab === 'archiv' ? 'list' : (['calendar', 'map'].includes(params.get('view') ?? '') ? params.get('view')! : 'list')
  const [q, setQ] = useState(f.q)
  useEffect(() => setQ(f.q), [f.q])
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

  const setP = (p: URLSearchParams) => setParams(p, { replace: true })
  const update = (patch: Partial<Filters>) => setP(applyFilters(params, patch))
  const setKey = (k: string, v: string | null) => {
    const n = new URLSearchParams(params)
    if (v) n.set(k, v); else n.delete(k)
    setParams(n)
  }

  const today = todayISO()
  const list = useMemo(() => {
    const pool = published.filter((e) => (tab === 'archiv' ? isPast(e, today) : !isPast(e, today)))
    return sortEvents(pool.filter((e) => matches(e, f, origin)), f.sort, origin, tab === 'archiv')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [published, params.toString(), tab, today])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    update({ q: q.trim() })
  }
  const [copied, setCopied] = useState(false)

  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      <nav className="tabs" aria-label={t.title}>
        <Link className="tab" to={lp('/events')} aria-current={tab === 'upcoming' ? 'page' : undefined}>{t.tabUpcoming}</Link>
        <Link className="tab" to={lp('/events?tab=archiv')} aria-current={tab === 'archiv' ? 'page' : undefined}>{t.tabArchive}</Link>
      </nav>

      <div className="stack">
        <form role="search" className="search-bar" onSubmit={onSearch}>
          <label htmlFor="ev-q" className="visually-hidden">{t.search}</label>
          <input id="ev-q" type="search" value={q} placeholder={t.searchPlaceholder} onChange={(e) => setQ(e.target.value)} />
          <button className="btn btn-primary" type="submit">{t.searchBtn}</button>
        </form>

        <div className="chips" aria-label={t.f.aud} role="group">
          {(['students', 'young-professionals'] as const).map((a) => {
            const on = f.aud.length === 1 && f.aud[0] === a
            return (
              <button key={a} type="button" className="chip" aria-pressed={on} onClick={() => update({ aud: on ? [] : [a] })}>
                {tx.audience[a]}
              </button>
            )
          })}
          <button type="button" className="chip" aria-pressed={f.format.length === 1 && f.format[0] === 'online'}
            onClick={() => update({ format: f.format[0] === 'online' && f.format.length === 1 ? [] : ['online'] })}>
            {tx.format.online}
          </button>
          <button type="button" className="chip" aria-pressed={f.near} onClick={() => update({ near: !f.near })}>
            📍 {t.near}{f.near && origin ? ` (${t.nearHint} ${origin.label})` : ''}
          </button>
        </div>
        {(f.near || f.sort === 'distance') && !origin && (
          <div className="notice notice-info stack" style={{ gap: 'var(--space-2)' }}>
            <span className="small">{t.nearNeedsOrigin}</span>
            <OriginPicker params={params} setParams={setP} />
          </div>
        )}

        <FilterPanel f={f} update={update} params={params} setParams={setP} />

        <div className="row-between">
          <p role="status" style={{ margin: 0, fontWeight: 600 }}>
            {list.length === 1 ? t.resultsOne : fmt(t.results, { n: list.length })}
          </p>
          <div className="row">
            {tab === 'upcoming' && (
              <div className="chips" role="group" aria-label={t.viewLabel}>
                {(['list', 'calendar', 'map'] as const).map((v) => (
                  <button key={v} type="button" className="chip" aria-pressed={view === v} onClick={() => setKey('view', v === 'list' ? null : v)}>
                    {t.views[v]}
                  </button>
                ))}
              </div>
            )}
            <label htmlFor="ev-sort" className="visually-hidden">{t.sort}</label>
            <select id="ev-sort" value={f.sort} onChange={(e) => update({ sort: e.target.value as Filters['sort'] })} style={{ width: 'auto' }}>
              <option value="date">{t.sort}: {t.sortDate}</option>
              <option value="added">{t.sort}: {t.sortAdded}</option>
              <option value="distance">{t.sort}: {t.sortDistance}</option>
            </select>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="notice">{t.none}</p>
        ) : view === 'calendar' ? (
          <CalendarView events={list} params={params} setParams={setParams} />
        ) : view === 'map' ? (
          <EventsMap events={list} />
        ) : (
          <div className="grid">
            {list.map((e) => (
              <div key={e.id} className="stack" style={{ gap: 0 }}>
                <EventCard event={e} />
                {e.recap && <p className="small" style={{ marginTop: 'var(--space-2)' }}><span className="badge badge-success">{t.recap}</span> <SampleBadge /></p>}
              </div>
            ))}
          </div>
        )}

        {tab === 'upcoming' && <p className="small muted">{t.pastHidden} <Link to={lp('/events?tab=archiv')}>{t.tabArchive} →</Link></p>}
        <div className="row">
          <p className="small muted" style={{ margin: 0 }}>{t.shareHint}</p>
          <button type="button" className="btn btn-sm" onClick={async () => {
            try { await navigator.clipboard.writeText(window.location.href); setCopied(true) } catch { /* clipboard blocked */ }
          }}>🔗 {t.copyLink}</button>
          <span role="status" className="small">{copied ? t.copied : ''}</span>
        </div>
      </div>

      {tab === 'upcoming' && <Subscribe filtered={list} lang={lang} />}
    </>
  )
}
