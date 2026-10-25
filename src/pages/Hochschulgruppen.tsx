import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { MapView } from '../components/MapView'
import { fmt, useLang, useLp, useT } from '../i18n'
import { directory } from '../i18n/directory'
import { REGIONS, taxonomy } from '../i18n/taxonomy'
import { BVS, HSGS, YOUNG_NET_OFFICE, type Hsg } from '../data/directory'
import { useDemo } from '../lib/demoStore'
import { formatDateRange, isPast, title, type HubEvent } from '../lib/events'
import { PLACES } from '../lib/places'

function nextStudentEvent(events: HubEvent[], city: string): HubEvent | undefined {
  return events
    .filter((e) => e.location === city && e.audience !== 'young-professionals' && !isPast(e))
    .sort((a, b) => a.start.localeCompare(b.start))[0]
}

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function Hochschulgruppen() {
  const t = useT(directory)
  const tx = useT(taxonomy)
  const lang = useLang()
  const lp = useLp()
  const { published } = useDemo()
  const [region, setRegion] = useState('')
  const list = HSGS.filter((h) => !region || h.region === region)

  const card = (h: Hsg) => {
    const next = nextStudentEvent(published, h.city)
    const bv = BVS.find((b) => b.id === h.bv)
    return (
      <li key={h.id} className="card stack" style={{ gap: 'var(--space-3)' }}>
        <h3 className="panel-title list-head">{h.name}</h3>
        <dl className="kv small">
          <dt>{t.hsg.university}</dt><dd>{h.university}</dd>
          <dt>{t.city}</dt><dd>{PLACES[h.city]?.label}</dd>
          <dt>{t.hsg.bv}</dt><dd>{bv?.name}</dd>
          <dt>{t.nextEvent}</dt>
          <dd>{next ? <Link to={lp(`/events/${next.slug}`)}>{title(next, lang)} | {formatDateRange(next, lang)}</Link> : t.none}</dd>
        </dl>
        <a className="more" href={h.url} target="_blank" rel="noopener noreferrer">{t.hsg.page}</a>
      </li>
    )
  }

  return (
    <>
      <PageHeader title={t.hsg.title} lead={t.hsg.lead} />

      <div className="stack">
        <div className="chips" role="group" aria-label={t.hsg.filterLabel}>
          <button type="button" className="chip" aria-pressed={region === ''} onClick={() => setRegion('')}>{t.hsg.all}</button>
          {REGIONS.filter((r) => r !== 'bundesweit').map((r) => (
            <button key={r} type="button" className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>{tx.region[r]}</button>
          ))}
        </div>
        <p className="small muted" role="status">{fmt(t.hsg.count, { n: list.length })}</p>

        <MapView
          points={list.map((h) => ({
            id: h.id,
            lat: PLACES[h.city].lat,
            lng: PLACES[h.city].lng,
            label: h.name,
            popup: <><strong>{h.name}</strong><br />{h.university}</>,
          }))}
        />

        <h2 className="visually-hidden">{t.hsg.list}</h2>
        <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>{list.map(card)}</ul>
      </div>

      <section className="section card stack" aria-labelledby="found-h">
        <h2 id="found-h" className="panel-title list-head">{t.hsg.foundTitle}</h2>
        <p>{t.hsg.foundText}</p>
        <div className="row">
          <a className="btn btn-cta" href={`mailto:${YOUNG_NET_OFFICE.email}`}>{t.hsg.foundCta}</a>
          <a className="btn" href="#toolkit">{t.hsg.toolkitLink}</a>
        </div>
      </section>

      <section id="toolkit" className="section" aria-labelledby="toolkit-h">
        <h2 id="toolkit-h">{t.hsg.toolkitTitle}</h2>
        <p>{t.hsg.toolkitLead}</p>
        <ul className="grid-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {t.hsg.tools.map((tool) => (
            <li key={tool.id} className="card stack" style={{ gap: 'var(--space-3)' }}>
              <h3 className="panel-title list-head">{tool.title}</h3>
              <p style={{ margin: 0 }}>{tool.text}</p>
              <div>
                <button type="button" className="btn" onClick={() => download(`vde-young-net-${tool.id}.txt`, `${tool.title}\n\n${tool.text}\n`)}>
                  {t.hsg.download}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
