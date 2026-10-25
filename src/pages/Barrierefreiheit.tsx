import { PageHeader } from '../components/Badges'
import { YOUNG_NET_OFFICE } from '../data/directory'
import { useT } from '../i18n'
import { info } from '../i18n/info'

export default function Barrierefreiheit() {
  const t = useT(info).a11y
  return (
    <div className="prose">
      <PageHeader title={t.title} lead={t.lead} />
      <section className="stack">
        <h2>{t.goalTitle}</h2>
        <p>{t.goal}</p>
      </section>
      <section className="section">
        <h2>{t.doneTitle}</h2>
        <ul>{t.done.map((d) => <li key={d}>{d}</li>)}</ul>
      </section>
      <section className="section">
        <h2>{t.limitsTitle}</h2>
        <ul>{t.limits.map((d) => <li key={d}>{d}</li>)}</ul>
      </section>
      <section className="section">
        <h2>{t.feedbackTitle}</h2>
        <p>{t.feedback} <a href={`mailto:${YOUNG_NET_OFFICE.email}`}>{YOUNG_NET_OFFICE.email}</a></p>
      </section>
      <p className="small muted section">{t.date}</p>
    </div>
  )
}
