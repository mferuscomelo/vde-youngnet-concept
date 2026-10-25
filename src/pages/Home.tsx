import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EventCard } from '../components/EventBits'
import { Icon } from '../components/Icon'
import { NewsletterBox } from '../components/NewsletterBox'
import { CHANNELS } from '../data/social'
import { useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { homeT } from '../i18n/home'
import { useDemo } from '../lib/demoStore'
import { isPast, sortEvents } from '../lib/events'
import { asset } from '../lib/asset'

export default function Home() {
  const t = useT(homeT)
  const c = useT(common)
  const lp = useLp()
  const nav = useNavigate()
  const { published } = useDemo()
  const [q, setQ] = useState('')
  const next = sortEvents(published.filter((e) => !isPast(e)), 'date', null).slice(0, 3)

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    nav(lp(q.trim() ? `/events?q=${encodeURIComponent(q.trim())}` : '/events'))
  }

  return (
    <>
      <section className="stage" aria-labelledby="home-h">
        <img className="stage-img" src={asset('images/vde/hsgt-2025.jpg')} alt={t.heroAlt} width="1023" height="512" fetchPriority="high" />
        <div className="stage-box stack">
          <p className="kicker">{t.kicker}</p>
          <h1 id="home-h">{t.title}</h1>
          <p className="subline">{t.subline}</p>
          <p>{t.lead}</p>
          <div className="row">
            <Link className="btn btn-cta" to={lp('/events')}>{t.ctaEvents}</Link>
            <Link className="btn" to={lp('/mitgliedschaft')}>{t.ctaJoin}</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="goals-h">
        <h2 id="goals-h">{t.goalsTitle}</h2>
        <div className="grid-2">
          {t.goals.map((g) => (
            <Link key={g.title} to={lp(g.to)} className="card card-link photo-card">
              <img src={g.img} alt={g.alt} loading="lazy" />
              <div className="tile">
                <h3 className="goal-title">{g.title}</h3>
                <p>{g.text}</p>
                <span className="tile-cta"><span className="btn btn-cta">{g.link}</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section grid-2 wide-left top" aria-labelledby="about-h">
        <div className="prose">
          <h2 id="about-h">{t.aboutTitle}</h2>
          {t.about.map((p) => <p key={p}>{p}</p>)}
        </div>
        <dl className="facts" aria-label={t.factsLabel}>
          {t.facts.map(([big, small]) => (
            <div key={small}>
              <dt className="stat">{big}</dt>
              <dd>{small}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" aria-labelledby="aud-h">
        <h2 id="aud-h">{t.audTitle}</h2>
        <div className="grid-3">
          {t.audiences.map((a) => (
            <Link key={a.key} to={lp(`/fuer/${a.key}`)} className="card card-link photo-card">
              <img src={a.img} alt={a.alt} loading="lazy" />
              <div className="tile">
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className="tile-cta"><span className="btn btn-cta">{c.more}</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="next-h">
        <div className="row-between" style={{ marginBottom: 'var(--space-5)' }}>
          <h2 id="next-h" style={{ margin: 0 }}>{t.next}</h2>
          <Link className="more" to={lp('/events')}>{c.allEvents}<Icon name="chevron-right" /></Link>
        </div>
        <form role="search" className="search-bar" onSubmit={onSearch} style={{ maxWidth: 640, marginBottom: 'var(--space-6)' }}>
          <label htmlFor="home-q" className="visually-hidden">{t.searchLabel}</label>
          <input id="home-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchPlaceholder} />
          <button className="btn btn-cta" type="submit">{t.search}</button>
        </form>
        <div className="grid-3">
          {next.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      <section className="section" aria-labelledby="where-h">
        <h2 id="where-h">{t.whereTitle}</h2>
        <div className="grid-3">
          {t.where.map(([title, text, to]) => (
            <Link key={to} to={lp(to)} className="card card-link tile">
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="tile-cta"><span className="btn btn-cta">{c.more}</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-h">
        <h2 id="gallery-h">{t.galleryTitle}</h2>
        <ul className="gallery">
          {t.gallery.map(([src, caption, href]) => (
            <li key={src}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <img src={src} alt="" loading="lazy" />
                <span>{caption}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="small muted">{t.photoCredit}</p>
      </section>

      <section className="section social-band" aria-labelledby="social-h">
        <div>
          <h2 id="social-h">{c.social.title}</h2>
          <p>{t.socialLead}</p>
        </div>
        <ul className="channels">
          {CHANNELS.map((ch) => (
            <li key={ch.id}>
              <a href={ch.url} target="_blank" rel="noopener noreferrer">
                <Icon name={ch.icon} size={32} />
                <span>
                  <strong>{ch.name}</strong>
                  <span className="small">{ch.handle}{ch.vde ? ` · ${c.social.vdeNote}` : ''}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section grid-2 top">
        <div className="card tile">
          <h2>{t.firstSteps}</h2>
          <p>{t.firstStepsText}</p>
          <span className="tile-cta"><Link className="btn btn-cta" to={lp('/erste-schritte')}>{t.firstStepsLink}</Link></span>
        </div>
        <div className="card">
          <NewsletterBox />
        </div>
      </section>
    </>
  )
}
