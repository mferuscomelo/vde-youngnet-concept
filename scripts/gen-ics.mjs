// Pre-generates subscribable ICS feeds into public/ics/ (a static host cannot
// build feeds on request). Filtered views beyond these presets are offered as
// one-off downloads in the browser.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { buildICS, eventToItem } from '../src/lib/ics.js'

const events = JSON.parse(readFileSync(new URL('../src/data/events.json', import.meta.url), 'utf8'))
const placesSrc = readFileSync(new URL('../src/lib/places.ts', import.meta.url), 'utf8')
const labels = Object.fromEntries([...placesSrc.matchAll(/(\w+): \{ label: '([^']+)'/g)].map((m) => [m[1], m[2]]))
const origin = process.env.HUB_ORIGIN ?? ''

const published = events.filter((e) => e.status === 'published')
const feeds = {
  all: { name: 'YoungNet Hub (Konzept) – alle Events', pick: () => true },
  'young-professionals': { name: 'YoungNet Hub (Konzept) – Young Professionals', pick: (e) => e.audience !== 'students' },
  students: { name: 'YoungNet Hub (Konzept) – Studierende', pick: (e) => e.audience !== 'young-professionals' },
}

mkdirSync(new URL('../public/ics/', import.meta.url), { recursive: true })
for (const lang of ['de', 'en']) {
  for (const [key, f] of Object.entries(feeds)) {
    const items = published.filter(f.pick).map((e) => eventToItem(e, { lang, origin, placeLabel: (k) => labels[k] ?? k }))
    writeFileSync(new URL(`../public/ics/${key}-${lang}.ics`, import.meta.url), buildICS(items, { name: f.name }))
  }
}
console.log('ics feeds written to public/ics/')
