import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EventCard } from '../components/EventBits'
import { NewsletterBox } from '../components/NewsletterBox'
import { useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { homeT } from '../i18n/home'
import { useDemo } from '../lib/demoStore'
import { isPast, sortEvents } from '../lib/events'

export default function Home() {
  const t = useT(homeT)
  const c = useT(common)
  const lp = useLp()
  const nav = useNavigate()
  const { published } = useDemo()
  const [q, setQ] = useState('')
  const next = sortEvents(published.filter((e) => !isPast(e)), 'date', null).slice(0, 6)

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    nav(lp(q.trim() ? `/events?q=${encodeURIComponent(q.trim())}` : '/events'))
  }
  const chips: [string, string][] = [
    [t.chips.students, '/events?aud=students'],
    [t.chips.yp, '/events?aud=young-professionals'],
    [t.chips.online, '/events?format=online'],
    [`📍 ${t.chips.near}`, '/events?near=1'],
  ]
  const tiles: [string, string[], string][] = [
    ['🗓', t.tiles.events, '/events'],
    ['🎓', t.tiles.hsg, '/hochschulgruppen'],
    ['🛠', t.tiles.organize, '/einreichen'],
  ]

  return (
    <>
      <section className="hero stack">
        <h1>{t.title}</h1>
        <p className="lead">{t.lead}</p>
        <form role="search" className="search-bar" onSubmit={onSearch} style={{ maxWidth: 640 }}>
          <label htmlFor="home-q" className="visually-hidden">{t.searchLabel}</label>
          <input id="home-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchPlaceholder} />
          <button className="btn btn-primary" type="submit">{t.search}</button>
        </form>
        <nav aria-label={t.quick} className="chips">
          {chips.map(([label, to]) => <Link key={to} className="chip" to={lp(to)}>{label}</Link>)}
        </nav>
      </section>

      <section className="grid" aria-label={t.entries}>
        {tiles.map(([icon, [title, text], to]) => (
          <Link key={to} to={lp(to)} className="card card-link tile">
            <span className="tile-icon" aria-hidden="true">{icon}</span>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{title} →</h2>
            <p className="muted" style={{ margin: 0 }}>{text}</p>
          </Link>
        ))}
      </section>

      <section className="section" aria-labelledby="next-h">
        <div className="row-between" style={{ marginBottom: 'var(--space-4)' }}>
          <h2 id="next-h" style={{ margin: 0 }}>{t.next}</h2>
          <Link to={lp('/events')}>{c.allEvents} →</Link>
        </div>
        <div className="grid">
          {next.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      <section className="section grid" aria-label={t.factsLabel}>
        {t.facts.map(([big, small]) => (
          <div key={big} className="card card-muted">
            <p className="stat">{big}</p>
            <p className="muted" style={{ margin: 0 }}>{small}</p>
          </div>
        ))}
      </section>

      <section className="section grid-2">
        <div className="card stack">
          <h2>{t.firstSteps}</h2>
          <Link className="btn" to={lp('/erste-schritte')}>{t.firstStepsLink} →</Link>
        </div>
        <div className="card">
          <NewsletterBox />
        </div>
      </section>
    </>
  )
}
