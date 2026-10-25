import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { LANGS, useLang, useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { useDemo } from '../lib/demoStore'
import { loadJSON, saveJSON } from '../lib/storage'
import { Logo } from './Logo'
import { NewsletterBox } from './NewsletterBox'

function ConceptModal({ onClose }: { onClose: () => void }) {
  const t = useT(common).modal
  const btn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    btn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="modal-backdrop">
      <div className="modal stack" role="dialog" aria-modal="true" aria-labelledby="concept-title">
        <h2 id="concept-title">{t.title}</h2>
        <p>{t.p1}</p>
        <p>{t.p2}</p>
        <p className="notice notice-warning">{t.p3}</p>
        <button ref={btn} type="button" className="btn btn-primary" onClick={onClose}>{t.ok}</button>
      </div>
    </div>
  )
}

function LangSwitch() {
  const lang = useLang()
  const { pathname, search } = useLocation()
  const t = useT(common)
  const rest = pathname.replace(/^\/(de|en)/, '')
  return (
    <nav className="lang-switch" aria-label={t.langLabel}>
      {LANGS.map((l) => (
        <Link key={l} to={`/${l}${rest}${search}`} aria-current={l === lang ? 'true' : undefined} lang={l} hrefLang={l}>
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}

function Header() {
  const t = useT(common)
  const lp = useLp()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  const items: [string, string][] = [
    ['/events', t.nav.events],
    ['/hochschulgruppen', t.nav.hsg],
    ['/bezirksvereine', t.nav.bv],
    ['/fachgesellschaften', t.nav.fg],
    ['/jobs', t.nav.jobs],
    ['/mitgliedschaft', t.nav.membership],
    ['/mach-mit', t.nav.join],
    ['/meine-events', t.nav.myEvents],
  ]
  return (
    <header className="site-header">
      <div className="container">
        <Logo />
        <button type="button" className="btn btn-sm nav-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((o) => !o)}>
          <span aria-hidden="true">{open ? '✕' : '☰'}</span> <span className="label">{open ? t.closeMenu : t.menu}</span>
        </button>
        <nav id="main-nav" className={`main-nav ${open ? 'open' : ''}`} aria-label={t.navLabel}>
          <ul>
            {items.map(([path, label]) => (
              <li key={path}><NavLink to={lp(path)}>{label}</NavLink></li>
            ))}
            <li><NavLink to={lp('/einreichen')} className="btn-primary" style={{ color: 'var(--color-text-inverse)' }}>+ {t.nav.submit}</NavLink></li>
          </ul>
        </nav>
        <LangSwitch />
      </div>
    </header>
  )
}

function Footer() {
  const t = useT(common).footer
  const lp = useLp()
  const { reset } = useDemo()
  const [resetMsg, setResetMsg] = useState(false)
  const col = (heading: string, links: [string, string][]) => (
    <div>
      <h2>{heading}</h2>
      <ul>
        {links.map(([to, label]) => <li key={to}><Link to={lp(to)}>{label}</Link></li>)}
      </ul>
    </div>
  )
  return (
    <footer className="site-footer">
      <div className="container stack">
        <div className="footer-cols">
          {col(t.discover, [
            ['/events', t.events],
            ['/events?tab=archiv', t.archive],
            ['/events#abo', t.calendar],
            ['/fachgesellschaften', t.fg],
            ['/jobs', t.jobs],
            ['/projekte', t.projects],
          ])}
          {col(t.community, [
            ['/erste-schritte', t.onboarding],
            ['/mentoring', t.mentoring],
            ['/ansprechpartner', t.contacts],
            ['/mitfahren', t.travel],
            ['/meine-events', t.myEvents],
          ])}
          {col(t.organize, [
            ['/einreichen', t.submit],
            ['/organizer', t.organizer],
            ['/mach-mit', t.join],
          ])}
          {col(t.about, [
            ['/konzept', t.concept],
            ['/barrierefreiheit', t.accessibility],
            ['/kontakt', t.contact],
          ])}
          <NewsletterBox compact />
        </div>
        <hr />
        <div className="row-between">
          <p className="small muted" style={{ maxWidth: '70ch', margin: 0 }}>{t.disclaimer}</p>
          <div className="row">
            <button type="button" className="btn btn-sm" onClick={() => { reset(); setResetMsg(true) }}>↺ {t.reset}</button>
            <span role="status" className="small">{resetMsg ? t.resetDone : ''}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function Layout() {
  const t = useT(common)
  const lang = useLang()
  const { pathname } = useLocation()
  const { resetCount } = useDemo()
  const [modal, setModal] = useState(() => !loadJSON<boolean>('modalSeen', false))
  const closeModal = () => {
    saveJSON('modalSeen', true)
    setModal(false)
  }
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>
      <div className="concept-banner" role="note">
        ⚠ {t.banner}
        <button type="button" onClick={() => setModal(true)}>{t.bannerMore}</button>
      </div>
      <Header />
      <main id="main" tabIndex={-1}>
        <div className="container">
          <Outlet key={resetCount} />
        </div>
      </main>
      <Footer />
      {modal && <ConceptModal onClose={closeModal} />}
    </>
  )
}
