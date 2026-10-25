import type { ReactNode } from 'react'
import { useT } from '../i18n'
import { common } from '../i18n/common'
import { taxonomy } from '../i18n/taxonomy'

const AUD_ICON: Record<string, string> = { students: '🎓', 'young-professionals': '💼', all: '👥' }

/** Colour-coded AND text-labelled, so colour is never the only signal. */
export function AudienceBadge({ audience }: { audience: string }) {
  const tx = useT(taxonomy)
  return (
    <span className={`badge badge-aud-${audience}`}>
      <span aria-hidden="true">{AUD_ICON[audience]}</span> {tx.audience[audience]}
    </span>
  )
}

export function SampleBadge({ kind = 'sample' }: { kind?: 'sample' | 'sampleText' | 'placeholder' | 'mock' }) {
  const t = useT(common)
  return <span className="badge badge-sample">{t[kind]}</span>
}

/** Visible marker for data that still has to be sourced. */
export function Todo({ children }: { children: ReactNode }) {
  return <span className="todo">TODO: {children}</span>
}

export function PageHeader({ title, lead, children }: { title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="stack" style={{ marginBottom: 'var(--space-6)' }}>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </header>
  )
}
