import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { SEED_EVENTS, type HubEvent, type Status } from './events'
import { loadJSON, removeKey, saveJSON } from './storage'

// Demo state: everything a visitor changes lives in the browser only.
type Timing = { submittedAt: number; approvedAt?: number }

type DemoState = {
  submitted: HubEvent[]
  status: Record<string, Status>
  timing: Record<string, Timing>
}

const EMPTY: DemoState = { submitted: [], status: {}, timing: {} }
const STATE_KEY = 'demo'
const BOOKMARK_KEY = 'bookmarks'

type Ctx = {
  /** Seed + submitted events with current status applied. */
  events: HubEvent[]
  published: HubEvent[]
  pending: HubEvent[]
  timing: Record<string, Timing>
  submit: (e: HubEvent, startedAt?: number) => void
  approve: (id: string) => void
  requestChanges: (id: string) => void
  reset: () => void
  /** Increments on reset so open pages can remount with fresh state. */
  resetCount: number
  bookmarks: string[]
  toggleBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
}

const DemoContext = createContext<Ctx | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(() => ({ ...EMPTY, ...loadJSON<DemoState>(STATE_KEY, EMPTY) }))
  const [resetCount, setResetCount] = useState(0)
  const [bookmarks, setBookmarks] = useState<string[]>(() => loadJSON<string[]>(BOOKMARK_KEY, []))

  useEffect(() => { saveJSON(STATE_KEY, state) }, [state])
  useEffect(() => { saveJSON(BOOKMARK_KEY, bookmarks) }, [bookmarks])

  const events = useMemo(
    () => [...SEED_EVENTS, ...state.submitted].map((e) => (state.status[e.id] ? { ...e, status: state.status[e.id] } : e)),
    [state],
  )

  // startedAt: when the organizer began filling the form, so time-to-publish covers the whole flow
  const submit = useCallback((e: HubEvent, startedAt = Date.now()) => {
    setState((s) => ({
      ...s,
      submitted: [...s.submitted, { ...e, status: 'pending' }],
      timing: { ...s.timing, [e.id]: { submittedAt: startedAt } },
    }))
  }, [])

  const setStatus = useCallback((id: string, status: Status) => {
    setState((s) => ({
      ...s,
      status: { ...s.status, [id]: status },
      timing: status === 'published' ? { ...s.timing, [id]: { submittedAt: s.timing[id]?.submittedAt ?? Date.now(), approvedAt: Date.now() } } : s.timing,
    }))
  }, [])

  const reset = useCallback(() => {
    setState(EMPTY)
    setBookmarks([])
    removeKey(STATE_KEY)
    removeKey(BOOKMARK_KEY)
    removeKey('onboarding')
    setResetCount((n) => n + 1)
  }, [])

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]))
  }, [])

  const value: Ctx = {
    events,
    published: events.filter((e) => e.status === 'published'),
    pending: events.filter((e) => e.status !== 'published'),
    timing: state.timing,
    submit,
    approve: (id) => setStatus(id, 'published'),
    requestChanges: (id) => setStatus(id, 'changes'),
    reset,
    resetCount,
    bookmarks,
    toggleBookmark,
    isBookmarked: (id) => bookmarks.includes(id),
  }
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo(): Ctx {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo outside DemoProvider')
  return ctx
}

/** Deterministic mock stats for the organizer view (labelled as mock data in the UI). */
export function mockStats(id: string): { views: number; signups: number } {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return { views: 40 + (h % 460), signups: 3 + (h % 57) }
}
