import { useState } from 'react'
import { PageHeader } from '../components/Badges'
import { MapView } from '../components/MapView'
import { useLang, useT } from '../i18n'
import { directory } from '../i18n/directory'
import { taxonomy } from '../i18n/taxonomy'
import { BVS, CONTACTS, HSGS, type Contact } from '../data/directory'
import { PLACES } from '../lib/places'

const SCOPES = ['region', 'bv', 'hsg'] as const
const SCOPE_COLOR = { region: 'var(--color-grey-dark)', bv: 'var(--color-blue)', hsg: 'var(--color-light-blue)' }

export default function Ansprechpartner() {
  const t = useT(directory)
  const tx = useT(taxonomy)
  const lang = useLang()
  const [scope, setScope] = useState<'' | Contact['scope']>('')
  const list = CONTACTS.filter((c) => !scope || c.scope === scope)

  const refLabel = (c: Contact) =>
    c.scope === 'region' ? `${tx.region[c.ref]}` : c.scope === 'bv' ? BVS.find((b) => b.id === c.ref)?.name ?? c.ref : HSGS.find((h) => h.id === c.ref)?.name ?? c.ref
  const role = (c: Contact) => (lang === 'en' ? c.role_en : c.role_de)

  return (
    <>
      <PageHeader title={t.contacts.title} lead={t.contacts.lead}>
        <p className="notice small"> {t.contacts.privacy}</p>
      </PageHeader>

      <div className="stack">
        <div className="chips" role="group" aria-label={t.contacts.filterLabel}>
          <button type="button" className="chip" aria-pressed={scope === ''} onClick={() => setScope('')}>{t.contacts.all}</button>
          {SCOPES.map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={scope === s} onClick={() => setScope(s)}>{t.contacts.scopes[s]}</button>
          ))}
        </div>

        <MapView
          points={list.map((c) => ({
            id: c.id,
            lat: PLACES[c.city].lat,
            lng: PLACES[c.city].lng,
            label: `${role(c)} – ${refLabel(c)}`,
            color: SCOPE_COLOR[c.scope],
            popup: <><strong>{refLabel(c)}</strong><br />{role(c)}</>,
          }))}
        />

        {SCOPES.filter((s) => !scope || s === scope).map((s) => (
          <section key={s} aria-labelledby={`scope-${s}`}>
            <h2 id={`scope-${s}`}>{t.contacts.scopes[s]}</h2>
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr><th scope="col">{t.contacts.filterLabel}</th><th scope="col">{t.contact}</th><th scope="col">{t.city}</th></tr>
                </thead>
                <tbody>
                  {list.filter((c) => c.scope === s).map((c) => (
                    <tr key={c.id}>
                      <td>{refLabel(c)}</td>
                      <td>
                        <strong>{role(c)}</strong><br />
                        {c.email && <><a href={`mailto:${c.email}`}>{c.email}</a><br /></>}
                        {c.phone && <span className="small muted">{c.phone}</span>}
                        {!c.email && c.url && <a href={c.url} target="_blank" rel="noopener noreferrer">{t.contacts.page}</a>}
                      </td>
                      <td>{PLACES[c.city].label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
