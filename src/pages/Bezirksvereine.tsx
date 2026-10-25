import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EventCard } from '../components/EventBits'
import { PageHeader } from '../components/Badges'
import { MapView } from '../components/MapView'
import { useLp, useT } from '../i18n'
import { directory } from '../i18n/directory'
import { REGIONS, taxonomy } from '../i18n/taxonomy'
import { BVS, HSGS } from '../data/directory'
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
      <PageHeader title={t.bv.title} lead={t.bv.lead} />

      <div className="stack">
        <div className="chips" role="group" aria-label={t.bv.region}>
          <button type="button" className="chip" aria-pressed={region === ''} onClick={() => setRegion('')}>{t.hsg.all}</button>
          {REGIONS.filter((r) => r !== 'bundesweit').map((r) => (
            <button key={r} type="button" className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>{tx.region[r]}</button>
          ))}
        </div>

        <MapView
          points={list.map((b) => ({
            id: b.id,
            lat: PLACES[b.city].lat,
            lng: PLACES[b.city].lng,
            label: b.name,
            popup: <><strong>{b.name}</strong><br />{b.address}</>,
          }))}
        />

        <h2 className="visually-hidden">{t.bv.list}</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="stack">
          {list.map((b) => {
            const ev = upcoming(b.id)
            const groups = HSGS.filter((h) => h.bv === b.id)
            return (
              <li key={b.id} className="stack section-item" id={b.id}>
                <div className="list-head">
                  <h3>{b.name}</h3>
                  <span className="badge badge-neutral">{tx.region[b.region]}</span>
                </div>
                <p className="muted small" style={{ margin: 0 }}>{b.official}</p>
                <dl className="kv">
                  <dt>{t.bv.address}</dt><dd>{b.address}</dd>
                  <dt>{t.bv.phone}</dt><dd>{b.phone}</dd>
                  <dt>{t.bv.email}</dt><dd><a href={`mailto:${b.email}`}>{b.email}</a></dd>
                  <dt>{t.bv.website}</dt><dd><a href={b.website} target="_blank" rel="noopener noreferrer">{b.website.replace(/^https:\/\/(www\.)?/, '').replace(/\/.*$/, '')}</a></dd>
                  {groups.length > 0 && (<><dt>{t.hsg.title}</dt><dd>{groups.map((h) => h.university).join(', ')}</dd></>)}
                </dl>
                {ev.length > 0 && (
                  <div>
                    <h4>{t.upcoming}</h4>
                    <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {ev.slice(0, 3).map((e) => <li key={e.id}><EventCard event={e} /></li>)}
                    </ul>
                    <p style={{ marginTop: 'var(--space-4)' }}>
                      <Link className="more" to={lp(`/events?region=${b.id}`)}>{t.showAll}</Link>
                    </p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
