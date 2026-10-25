import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EventCard } from '../components/EventBits'
import { PageHeader, SampleBadge, Todo } from '../components/Badges'
import { MapView } from '../components/MapView'
import { useLp, useT } from '../i18n'
import { directory } from '../i18n/directory'
import { REGIONS, taxonomy } from '../i18n/taxonomy'
import { BVS } from '../data/directory'
import { useDemo } from '../lib/demoStore'
import { isPast } from '../lib/events'
import { PLACES } from '../lib/places'

export default function Bezirksvereine() {
  const t = useT(directory)
  const tx = useT(taxonomy)
  const lp = useLp()
  const { published } = useDemo()
  const [region, setRegion] = useState('')
  const list = BVS.filter((b) => !region || b.region === region)
  const upcoming = (id: string) => published.filter((e) => e.bv === id && !isPast(e)).sort((a, b) => a.start.localeCompare(b.start))

  return (
    <>
      <PageHeader title={t.bv.title} lead={t.bv.lead}>
        <p className="notice notice-warning small"><SampleBadge kind="placeholder" /> {t.placeholderNote} <Todo>{t.todoSource}</Todo></p>
      </PageHeader>

      <div className="stack">
        <div className="field" style={{ maxWidth: 280 }}>
          <label htmlFor="bv-region">{t.bv.region}</label>
          <select id="bv-region" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">{t.hsg.all}</option>
            {REGIONS.filter((r) => r !== 'bundesweit').map((r) => <option key={r} value={r}>{tx.region[r]}</option>)}
          </select>
        </div>

        <MapView
          points={list.map((b) => ({
            id: b.id,
            lat: PLACES[b.city].lat,
            lng: PLACES[b.city].lng,
            label: b.name,
            popup: <><strong>{b.name}</strong><br />{tx.region[b.region]} · {upcoming(b.id).length} Events</>,
          }))}
        />

        <h2 className="visually-hidden">{t.bv.list}</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="stack">
          {list.map((b) => {
            const ev = upcoming(b.id)
            return (
              <li key={b.id} className="card stack" id={b.id}>
                <div className="row-between">
                  <h3 style={{ margin: 0 }}>{b.name}</h3>
                  <span className="badge badge-neutral">{tx.region[b.region]}</span>
                </div>
                <dl className="kv small">
                  <dt>{t.city}</dt><dd>{PLACES[b.city].label}</dd>
                  <dt>{t.bv.website}</dt><dd><Todo>{t.todoSource}</Todo></dd>
                  <dt>{t.contact}</dt><dd>{t.nameTba}</dd>
                </dl>
                <div>
                  <h4 style={{ fontSize: '1rem' }}>{t.upcoming}</h4>
                  {ev.length === 0 ? (
                    <p className="small muted">{t.noUpcoming}</p>
                  ) : (
                    <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {ev.slice(0, 3).map((e) => <li key={e.id}><EventCard event={e} /></li>)}
                    </ul>
                  )}
                  <p className="small" style={{ marginTop: 'var(--space-3)' }}>
                    <Link to={lp(`/events?region=${b.id}`)}>{t.showAll} →</Link>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
