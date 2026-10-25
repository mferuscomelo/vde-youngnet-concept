import { Link } from 'react-router-dom'
import { PageHeader, Todo } from '../components/Badges'
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
      <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {FGS.map((fg) => {
          const events = published.filter((e) => e.fachgesellschaft === fg.key && !isPast(e)).sort((a, b) => a.start.localeCompare(b.start))
          return (
            <li key={fg.key} className="card stack" style={{ gap: 'var(--space-3)' }} id={fg.key.toLowerCase()}>
              <div>
                <h2 style={{ fontSize: '1.375rem', marginBottom: 4 }}>{fg.key}</h2>
                <p className="small muted" style={{ margin: 0 }}>{lang === 'en' ? fg.name_en : fg.name_de}</p>
              </div>
              <p style={{ margin: 0 }}>{lang === 'en' ? fg.scope_en : fg.scope_de}</p>
              <div>
                <h3 style={{ fontSize: '0.9375rem', marginBottom: 4 }}>{t.fg.forum}</h3>
                <p className="small" style={{ margin: 0 }}>{lang === 'en' ? fg.forum_en : fg.forum_de}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.9375rem', marginBottom: 4 }}>{t.upcoming}</h3>
                {events.length === 0 ? (
                  <p className="small muted" style={{ margin: 0 }}>{t.noUpcoming}</p>
                ) : (
                  <ul className="small" style={{ margin: 0 }}>
                    {events.map((e) => (
                      <li key={e.id}><Link to={lp(`/events/${e.slug}`)}>{title(e, lang)}</Link> · {formatDateRange(e, lang)}</li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="small" style={{ margin: 0 }}><Todo>{t.fg.verify}</Todo></p>
              <div style={{ marginTop: 'auto' }}>
                <Link className="btn btn-sm" to={lp(`/events?fg=${fg.key}`)}>{t.allEventsFor} →</Link>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
