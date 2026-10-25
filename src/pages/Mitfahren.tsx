import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AudienceBadge, PageHeader, SampleBadge } from '../components/Badges'
import { useLocationLabel } from '../components/EventBits'
import { fmt, useLang, useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { travel } from '../i18n/travel'
import { useDemo } from '../lib/demoStore'
import { formatDateRange, isPast, title, type HubEvent } from '../lib/events'

type Ride = { id: string; kind: 'offer' | 'search'; from: string; date: string; seats?: number; mode: string; name: string; sample?: boolean }

// Sample entries keyed by event id (embedded world, Hannover Messe). Made up.
const SAMPLE_RIDES: Record<string, Ride[]> = {
  n05: [{ id: 's1', kind: 'offer', from: 'Karlsruhe', date: '2027-03-16', seats: 3, mode: 'auto', name: 'Beispiel', sample: true }],
  n06: [{ id: 's2', kind: 'search', from: 'Göttingen', date: '2027-04-06', mode: 'bahn', name: 'Beispiel', sample: true }],
}

function RideForm({ event, initialKind, onAdd, onCancel }: { event: HubEvent; initialKind: Ride['kind']; onAdd: (r: Ride) => void; onCancel: () => void }) {
  const t = useT(travel)
  const [kind, setKind] = useState(initialKind)
  const req = <span className="muted small"> ({t.required})</span>
  const pfx = `ride-${event.id}`
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    onAdd({
      id: `${Date.now()}`,
      kind,
      from: String(d.get('from')),
      date: String(d.get('date')),
      seats: kind === 'offer' ? Number(d.get('seats')) : undefined,
      mode: String(d.get('mode')),
      name: String(d.get('name') ?? ''),
    })
  }
  return (
    <form onSubmit={onSubmit} className="card card-muted stack" style={{ gap: 'var(--space-3)' }}>
      <fieldset className="field">
        <legend>{t.kind}</legend>
        <div className="row">
          <label className="checkbox"><input type="radio" name="kind" checked={kind === 'offer'} onChange={() => setKind('offer')} /> {t.offer}</label>
          <label className="checkbox"><input type="radio" name="kind" checked={kind === 'search'} onChange={() => setKind('search')} /> {t.search}</label>
        </div>
      </fieldset>
      <div className="form-grid two">
        <div className="field"><label htmlFor={`${pfx}-from`}>{t.from}{req}</label><input id={`${pfx}-from`} name="from" type="text" required /></div>
        <div className="field"><label htmlFor={`${pfx}-date`}>{t.date}{req}</label><input id={`${pfx}-date`} name="date" type="date" required defaultValue={event.start} /></div>
        <div className="field">
          <label htmlFor={`${pfx}-mode`}>{t.mode}</label>
          <select id={`${pfx}-mode`} name="mode" defaultValue="auto">
            {Object.entries(t.modes).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        {kind === 'offer' && (
          <div className="field"><label htmlFor={`${pfx}-seats`}>{t.seats}{req}</label><input id={`${pfx}-seats`} name="seats" type="number" min={1} max={8} defaultValue={2} required /></div>
        )}
        <div className="field"><label htmlFor={`${pfx}-name`}>{t.name}</label><input id={`${pfx}-name`} name="name" type="text" autoComplete="given-name" /></div>
      </div>
      <div className="row">
        <button type="submit" className="btn btn-primary">{t.add}</button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>{t.cancel}</button>
      </div>
    </form>
  )
}

function EventRides({ event, highlighted, rides, onAdd }: { event: HubEvent; highlighted: boolean; rides: Ride[]; onAdd: (r: Ride) => void }) {
  const t = useT(travel)
  const lang = useLang()
  const lp = useLp()
  const loc = useLocationLabel()
  const [formKind, setFormKind] = useState<Ride['kind'] | null>(highlighted ? 'offer' : null)
  const [msg, setMsg] = useState(false)
  const all = [...(SAMPLE_RIDES[event.id] ?? []), ...rides]
  const dateFmt = (iso: string) => formatDateRange({ start: iso, end: iso }, lang)

  return (
    <li id={`ride-${event.slug}`} className="card stack" style={{ gap: 'var(--space-3)', ...(highlighted ? { borderColor: 'var(--color-accent)', borderWidth: 2 } : {}) }}>
      <div className="row-between">
        <div className="stack" style={{ gap: 'var(--space-1)' }}>
          <div className="row" style={{ gap: 6 }}>
            <AudienceBadge audience={event.audience} />
            {highlighted && <span className="badge badge-success">{t.highlighted}</span>}
          </div>
          <h3 style={{ margin: 0 }}>{title(event, lang)}</h3>
          <p className="small muted" style={{ margin: 0 }}>{formatDateRange(event, lang)} · 📍 {loc(event)} · <Link to={lp(`/events/${event.slug}`)}>{t.eventLink}</Link></p>
        </div>
        {!formKind && (
          <div className="row">
            <button type="button" className="btn btn-sm" onClick={() => { setFormKind('offer'); setMsg(false) }}>🚗 {t.offer}</button>
            <button type="button" className="btn btn-sm" onClick={() => { setFormKind('search'); setMsg(false) }}>🙋 {t.search}</button>
          </div>
        )}
      </div>

      {formKind && (
        <RideForm
          key={formKind}
          event={event}
          initialKind={formKind}
          onCancel={() => setFormKind(null)}
          onAdd={(r) => { onAdd(r); setFormKind(null); setMsg(true) }}
        />
      )}
      <p role="status" className="small" style={{ margin: 0 }}>{msg ? t.added : ''}</p>

      <div>
        <h4 className="small muted" style={{ margin: '0 0 var(--space-2)' }}>{t.entries} ({all.length})</h4>
        {all.length === 0 ? (
          <p className="small muted" style={{ margin: 0 }}>{t.noEntries}</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-2)' }}>
            {all.map((r) => (
              <li key={r.id} className="row small" style={{ gap: 6 }}>
                <span className={`badge ${r.kind === 'offer' ? 'badge-success' : 'badge-neutral'}`}>{r.kind === 'offer' ? t.offerShort : t.searchShort}</span>
                <span>{fmt(t.fromCity, { city: r.from })} · {dateFmt(r.date)} · {t.modes[r.mode]}{r.seats ? ` · ${fmt(t.seatsShort, { n: r.seats })}` : ''} · {r.name || t.anonymous}</span>
                {r.sample && <SampleBadge />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export default function Mitfahren() {
  const t = useT(travel)
  const c = useT(common)
  const { published } = useDemo()
  const [params] = useSearchParams()
  const selected = params.get('event')
  const [rides, setRides] = useState<Record<string, Ride[]>>({})

  const events = published
    .filter((e) => (e.type === 'kongress' || e.type === 'yp-meetup') && !isPast(e))
    .sort((a, b) => a.start.localeCompare(b.start))

  useEffect(() => {
    if (!selected) return
    const el = document.getElementById(`ride-${selected}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selected])

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <div className="notice notice-info">
          <strong>{t.howTitle}:</strong> {t.how}
          <br />
          <span className="small">{c.demoOnly}</span>
        </div>
      </PageHeader>
      {events.length === 0 ? (
        <p className="muted">{t.none}</p>
      ) : (
        <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
          {events.map((e) => (
            <EventRides
              key={e.id}
              event={e}
              highlighted={e.slug === selected}
              rides={rides[e.id] ?? []}
              onAdd={(r) => setRides((s) => ({ ...s, [e.id]: [...(s[e.id] ?? []), r] }))}
            />
          ))}
        </ul>
      )}
    </>
  )
}
