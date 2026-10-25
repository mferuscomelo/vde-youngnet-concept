import type { ReactNode } from 'react'
import { useT } from '../i18n'
import { taxonomy } from '../i18n/taxonomy'

/** Colour-coded AND text-labelled, so colour is never the only signal. */
export function AudienceBadge({ audience }: { audience: string }) {
  const tx = useT(taxonomy)
  return (
    <span className={`badge badge-aud-${audience}`}>{tx.audience[audience]}</span>
  )
}

export function PageHeader({ title, lead, children }: { title: string; lead?: ReactNode; children?: ReactNode }) {
  return (
    <header className="stack" style={{ marginBottom: 'var(--space-7)' }}>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </header>
  )
}
