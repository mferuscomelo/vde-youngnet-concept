import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { useLang, useLp, useT } from '../i18n'
import { directory } from '../i18n/directory'
import { FGS } from '../data/directory'
import { useDemo } from '../lib/demoStore'
import { formatDateRange, isPast, title } from '../lib/events'

export default function Fachgesellschaften() {
  const t = useT(directory)
  const lang = useLang()
  const lp = useLp()
  const { published } = useDemo()

  return (
    <>
      <PageHeader title={t.fg.title} lead={t.fg.lead} />
      <ul className="grid grid-wide" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {FGS.map((fg) => {
          const events = published.filter((e) => e.fachgesellschaft === fg.key && !isPast(e)).sort((a, b) => a.start.localeCompare(b.start))
          return (
            <li key={fg.key} className="card fg-card" id={fg.key.toLowerCase()}>
              <img className="fg-banner" src={fg.img} alt={lang === 'en' ? fg.img_alt_en : fg.img_alt_de} width="1023" height="512" loading="lazy" />
              <div className="fg-body stack">
                <div className="list-head" style={{ display: 'block' }}>
                  <h2 className="panel-title">{fg.key}</h2>
                  <p className="fg-name">{lang === 'en' ? fg.name_en : fg.name_de}</p>
                </div>
                <p style={{ margin: 0 }}>{lang === 'en' ? fg.scope_en : fg.scope_de}</p>
                <div className="fg-young">
                  <h3 className="sub-head">{t.fg.forum}</h3>
                  <p style={{ margin: 0 }}>{lang === 'en' ? fg.young_en : fg.young_de}</p>
                  {fg.young_url && <p style={{ margin: 'var(--space-3) 0 0' }}><a className="more" href={fg.young_url} target="_blank" rel="noopener noreferrer">{t.fg.youngLink}</a></p>}
                </div>
                <div>
                  <h3 className="sub-head">{t.upcoming}</h3>
                  {events.length === 0 ? (
                    <p className="muted" style={{ margin: 0 }}>{t.noUpcoming}</p>
                  ) : (
                    <ul className="item-list">
                      {events.map((e) => (
                        <li key={e.id}>
                          <span className="meta-line">{formatDateRange(e, lang)}</span>
                          <Link to={lp(`/events/${e.slug}`)}>{title(e, lang)}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="fg-links">
                  <Link className="more" to={lp(`/events?fg=${fg.key}`)}>{t.allEventsFor}</Link>
                  <a className="more" href={fg.url} target="_blank" rel="noopener noreferrer">{t.fg.website}</a>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="small muted" style={{ marginTop: 'var(--space-5)' }}>{t.fg.photoCredit}</p>
    </>
  )
}
