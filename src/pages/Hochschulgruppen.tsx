import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, SampleBadge, Todo } from '../components/Badges'
import { MapView } from '../components/MapView'
import { fmt, useLang, useLp, useT } from '../i18n'
import { directory } from '../i18n/directory'
import { BVS, HSGS, type Hsg, type HsgStatus } from '../data/directory'
import { useDemo } from '../lib/demoStore'
import { formatDateRange, isPast, title, type HubEvent } from '../lib/events'
import { PLACES } from '../lib/places'

const STATUS_BADGE: Record<HsgStatus, string> = { aktiv: 'badge-success', sucht: 'badge-warning', ruhend: 'badge-neutral' }
const STATUS_ICON: Record<HsgStatus, string> = { aktiv: '●', sucht: '◐', ruhend: '○' }
const STATUS_COLOR: Record<HsgStatus, string> = { aktiv: 'var(--color-success)', sucht: 'var(--color-warning)', ruhend: 'var(--color-border-strong)' }

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
  const lang = useLang()
  const lp = useLp()
  const { published } = useDemo()
  const [status, setStatus] = useState<HsgStatus | ''>('')
  const list = HSGS.filter((h) => !status || h.status === status)

  const card = (h: Hsg) => {
    const next = nextStudentEvent(published, h.city)
    const bv = BVS.find((b) => b.id === h.bv)
    return (
      <li key={h.id} className="card stack" style={{ gap: 'var(--space-2)' }}>
        <div className="row-between">
          <h3 style={{ margin: 0 }}>{h.name}</h3>
          <span className={`badge ${STATUS_BADGE[h.status]}`}><span aria-hidden="true">{STATUS_ICON[h.status]}</span> {t.status[h.status]}</span>
        </div>
        <dl className="kv small">
          <dt>{t.hsg.university}</dt><dd>{h.university}</dd>
          <dt>{t.city}</dt><dd>{PLACES[h.city]?.label}</dd>
          <dt>{t.hsg.bv}</dt><dd>{bv?.name}</dd>
          <dt>{t.contact}</dt><dd>{t.nameTba} <Todo>{t.todoSource}</Todo></dd>
          <dt>{t.nextEvent}</dt>
          <dd>{next ? <Link to={lp(`/events/${next.slug}`)}>{title(next, lang)} · {formatDateRange(next, lang)}</Link> : t.none}</dd>
        </dl>
        {h.status === 'ruhend' && (
          <div className="notice notice-info small">
            <strong>{t.hsg.reviveTitle}:</strong> {t.hsg.reviveText}
            <br />{t.hsg.reviveWho}
            <br /><a href="#toolkit">{t.hsg.reviveKit} →</a>
          </div>
        )}
      </li>
    )
  }

  return (
    <>
      <PageHeader title={t.hsg.title} lead={t.hsg.lead}>
        <p className="notice notice-warning small"><SampleBadge kind="placeholder" /> {t.placeholderNote}</p>
      </PageHeader>

      <div className="stack">
        <div className="chips" role="group" aria-label={t.hsg.filterLabel}>
          <button type="button" className="chip" aria-pressed={status === ''} onClick={() => setStatus('')}>{t.hsg.all}</button>
          {(['aktiv', 'sucht', 'ruhend'] as HsgStatus[]).map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={status === s} onClick={() => setStatus(s)}>
              <span aria-hidden="true">{STATUS_ICON[s]}</span> {t.status[s]}
            </button>
          ))}
        </div>
        <p className="small muted" role="status">{fmt(t.hsg.count, { n: list.length })}</p>

        <MapView
          points={list.map((h) => ({
            id: h.id,
            lat: PLACES[h.city].lat,
            lng: PLACES[h.city].lng,
            label: `${h.name} – ${t.status[h.status]}`,
            color: STATUS_COLOR[h.status],
            popup: <><strong>{h.name}</strong><br />{PLACES[h.city].label} · {t.status[h.status]}</>,
          }))}
        />

        <h2 className="visually-hidden">{t.hsg.list}</h2>
        <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>{list.map(card)}</ul>
      </div>

      <section className="section card card-muted stack" aria-labelledby="revive-h">
        <h2 id="revive-h">{t.hsg.reviveCtaTitle}</h2>
        <p>{t.hsg.reviveCtaText}</p>
        <div className="row">
          <Link className="btn btn-primary" to={lp('/ansprechpartner')}>{t.hsg.contacts}</Link>
          <a className="btn" href="#toolkit">{t.hsg.reviveKit}</a>
        </div>
      </section>

      <section id="toolkit" className="section" aria-labelledby="toolkit-h">
        <h2 id="toolkit-h">{t.hsg.toolkitTitle}</h2>
        <p className="muted">{t.hsg.toolkitLead}</p>
        <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {t.hsg.tools.map((tool) => (
            <li key={tool.id} className="card stack" style={{ gap: 'var(--space-2)' }}>
              <h3 style={{ margin: 0 }}>{tool.title}</h3>
              <p className="small muted" style={{ margin: 0 }}>{tool.text}</p>
              <div>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => download(`${tool.id}-demo.txt`, `${tool.title}\n\n${tool.text}\n\n[Konzept-Prototyp – Demo-Datei / concept prototype – demo file]\n`)}
                >
                  ⬇ {t.hsg.download}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
