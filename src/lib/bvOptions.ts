import { BVS } from '../data/directory'

// Bezirksverein options for the event region filter.
export const BV_OPTIONS: { id: string; label: string }[] = BVS.map((b) => ({ id: b.id, label: b.name }))
