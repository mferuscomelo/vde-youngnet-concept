import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LANGS, useLang, useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { CHANNELS } from '../data/social'
import { useDemo } from '../lib/demoStore'
import { loadJSON, saveJSON } from '../lib/storage'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { asset } from '../lib/asset'

const LANG_NAMES: Record<string, string> = { de: 'Deutsch', en: 'English' }

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
        <p className="notice">{t.p3}</p>
        <button ref={btn} type="button" className="btn btn-primary" onClick={onClose}>{t.ok}</button>
      </div>
    </div>
  )
}

/** Desktop: "Deutsch ⌄" dropdown as on vde.com. Mobile menu: plain language links. */
function MetaLinks({ className, dropdown = false }: { className?: string; dropdown?: boolean }) {
  const t = useT(common)
  const lang = useLang()
  const { pathname, search } = useLocation()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])
  const rest = pathname.replace(/^\/(de|en)/, '')
  const langLink = (l: (typeof LANGS)[number]) => (
    <Link to={`/${l}${rest}${search}`} aria-current={l === lang ? 'true' : undefined} lang={l} hrefLang={l}>
      {LANG_NAMES[l]}
    </Link>
  )
  return (
    <ul className={className}>
      <li><a href={`https://www.vde.com/${lang}`}>{t.vdeHome}</a></li>
      <li><a href={`https://www.vde.com/${lang}/youngnet`}>{t.vdeYoungNet}</a></li>
      {dropdown ? (
        <li className="lang-dropdown">
          <button type="button" aria-expanded={open} aria-label={t.langLabel} onClick={() => setOpen((o) => !o)}>
            {LANG_NAMES[lang]}<Icon name="chevron-down" size={16} />
          </button>
          {open && (
            <ul className="popover-list">
              {LANGS.filter((l) => l !== lang).map((l) => <li key={l}>{langLink(l)}</li>)}
            </ul>
          )}
        </li>
      ) : (
        LANGS.map((l) => <li key={l}>{langLink(l)}</li>)
      )}
    </ul>
  )
}

/** "Für dich" menu: popover on desktop, inline sub-list in the mobile menu. */
function NavGroup({ label, items }: { label: string; items: [string, string][] }) {
  const lp = useLp()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  const active = items.some(([path]) => pathname === lp(path))
  return (
    <li ref={ref} className={`nav-group${active ? ' active' : ''}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {label}<Icon name="chevron-down" size={16} />
      </button>
      <ul className={`subnav${open ? ' open' : ''}`}>
        {items.map(([path, text]) => <li key={path}><NavLink to={lp(path)}>{text}</NavLink></li>)}
      </ul>
    </li>
  )
}

function Header() {
  const t = useT(common)
  const lp = useLp()
  const nav = useNavigate()
  const { bookmarks } = useDemo()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  const groups: [string, string][] = [
    ['/fuer/studierende', t.nav.students],
    ['/fuer/young-professionals', t.nav.yp],
    ['/fuer/schueler-azubis', t.nav.pupils],
  ]
  const items: [string, string][] = [
    ['/events', t.nav.events],
    ['/hochschulgruppen', t.nav.hsg],
    ['/fachgesellschaften', t.nav.fg],
    ['/bezirksvereine', t.nav.bv],
    ['/mitgliedschaft', t.nav.membership],
    ['/mach-mit', t.nav.join],
  ]
  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    nav(lp(q.trim() ? `/events?q=${encodeURIComponent(q.trim())}` : '/events'))
    setQ('')
  }
  return (
    <header className="site-header">
      <div className="container">
        <nav className="meta-nav" aria-label={t.metaLabel}>
          <MetaLinks dropdown />
        </nav>
        <div className="header-main">
          <Logo />
          <div className="header-tools">
            <Link className="tool-btn" to={lp('/meine-events')} aria-label={bookmarks.length ? `${t.nav.myEvents} (${bookmarks.length})` : undefined}>
              <Icon name="star" filled={bookmarks.length > 0} /> <span className="label">{t.nav.myEvents}</span>
              {bookmarks.length > 0 && <span className="count" aria-hidden="true">{bookmarks.length}</span>}
            </Link>
            <form role="search" className="header-search" onSubmit={onSearch}>
              <label htmlFor="header-q" className="visually-hidden">{t.searchLabel}</label>
              <input id="header-q" type="search" value={q} placeholder={t.searchPlaceholder} onChange={(e) => setQ(e.target.value)} />
              <button type="submit" aria-label={t.searchSubmit}><Icon name="search" /></button>
            </form>
            <Link className="tool-btn outline search-mobile" to={lp('/events')} aria-label={t.searchLabel}><Icon name="search" /></Link>
            <Link className="tool-btn blue submit-btn" to={lp('/einreichen')}>{t.nav.submit}</Link>
            <button type="button" className="tool-btn blue nav-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open ? t.closeMenu : t.menu} onClick={() => setOpen((o) => !o)}>
              <Icon name={open ? 'close' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </div>
      <nav id="main-nav" className={`main-nav ${open ? 'open' : ''}`} aria-label={t.navLabel}>
        <div className="container">
          <div className="mobile-only mobile-submit"><Link className="btn btn-primary" to={lp('/einreichen')}>{t.nav.submit}</Link></div>
          <ul>
            <NavGroup label={t.nav.forYou} items={groups} />
            {items.map(([path, label]) => (
              <li key={path}><NavLink to={lp(path)}>{label}</NavLink></li>
            ))}
            <li className="mobile-only"><NavLink to={lp('/meine-events')}>{t.nav.myEvents}</NavLink></li>
          </ul>
          <MetaLinks className="mobile-only meta-list" />
        </div>
      </nav>
    </header>
  )
}

export function SocialLinks({ className = 'social-links' }: { className?: string }) {
  const t = useT(common).social
  return (
    <ul className={className}>
      {CHANNELS.map((ch) => (
        <li key={ch.id}>
          <a href={ch.url} target="_blank" rel="noopener noreferrer" aria-label={`${ch.name}: ${ch.handle}${ch.vde ? ` (${t.vdeNote})` : ''}`}>
            <Icon name={ch.icon} size={24} />
          </a>
        </li>
      ))}
    </ul>
  )
}

function Footer() {
  const t = useT(common).footer
  const s = useT(common).social
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
      <div className="footer-main">
        <div className="container">
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
            <div>
              <h2>{s.label}</h2>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-meta">
        <div className="container">
          <div>
            <ul>
              <li><Link to={lp('/konzept')}>{t.concept}</Link></li>
              <li><Link to={lp('/barrierefreiheit')}>{t.accessibility}</Link></li>
              <li><Link to={lp('/kontakt')}>{t.contact}</Link></li>
              <li><button type="button" onClick={() => { reset(); setResetMsg(true) }}>{t.reset}</button></li>
            </ul>
            <p role="status" className="copyright">{resetMsg ? t.resetDone : ''}</p>
            <p className="copyright">© {new Date().getFullYear()} {t.disclaimer}</p>
          </div>
          <img className="zeichen" src={asset('brand/vde-zeichen.svg')} alt="VDE Zeichen" width="62" height="50" />
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
        {t.banner}
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
