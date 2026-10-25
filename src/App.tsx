import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LangContext, LANGS, type Lang } from './i18n'
import Home from './pages/Home'

const page = (load: () => Promise<{ default: React.ComponentType }>) => {
  const C = lazy(load)
  return (
    <Suspense fallback={<p className="muted">…</p>}>
      <C />
    </Suspense>
  )
}

function LangRoot() {
  const { lang } = useParams()
  if (!LANGS.includes(lang as Lang)) return <Navigate to="/de" replace />
  return (
    <LangContext.Provider value={lang as Lang}>
      <Layout />
    </LangContext.Provider>
  )
}

function preferredLang(): Lang {
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'de'
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${preferredLang()}`} replace />} />
      <Route path="/:lang" element={<LangRoot />}>
        <Route index element={<Home />} />
        <Route path="events" element={page(() => import('./pages/Events'))} />
        <Route path="events/:slug" element={page(() => import('./pages/EventDetail'))} />
        <Route path="einreichen" element={page(() => import('./pages/Submit'))} />
        <Route path="organizer" element={page(() => import('./pages/Organizer'))} />
        <Route path="hochschulgruppen" element={page(() => import('./pages/Hochschulgruppen'))} />
        <Route path="bezirksvereine" element={page(() => import('./pages/Bezirksvereine'))} />
        <Route path="ansprechpartner" element={page(() => import('./pages/Ansprechpartner'))} />
        <Route path="fachgesellschaften" element={page(() => import('./pages/Fachgesellschaften'))} />
        <Route path="jobs" element={page(() => import('./pages/Jobs'))} />
        <Route path="projekte" element={page(() => import('./pages/Projekte'))} />
        <Route path="mentoring" element={page(() => import('./pages/Mentoring'))} />
        <Route path="mitfahren" element={page(() => import('./pages/Mitfahren'))} />
        <Route path="newsletter" element={page(() => import('./pages/Newsletter'))} />
        <Route path="mitgliedschaft" element={page(() => import('./pages/Mitgliedschaft'))} />
        <Route path="mach-mit" element={page(() => import('./pages/MachMit'))} />
        <Route path="erste-schritte" element={page(() => import('./pages/ErsteSchritte'))} />
        <Route path="meine-events" element={page(() => import('./pages/MeineEvents'))} />
        <Route path="barrierefreiheit" element={page(() => import('./pages/Barrierefreiheit'))} />
        <Route path="kontakt" element={page(() => import('./pages/Kontakt'))} />
        <Route path="konzept" element={page(() => import('./pages/Konzept'))} />
        <Route path="*" element={page(() => import('./pages/NotFound'))} />
      </Route>
    </Routes>
  )
}
