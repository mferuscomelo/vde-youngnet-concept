import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { NewsletterBox } from '../components/NewsletterBox'
import { useLp, useT } from '../i18n'
import { common } from '../i18n/common'
import { newsletterPage } from '../i18n/newsletterPage'

export default function Newsletter() {
  const t = useT(newsletterPage)
  const c = useT(common)
  const lp = useLp()
  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      <div className="grid-2 wide-left">
        <div className="card stack">
          <p className="notice notice-info small">{c.demoOnly}</p>
          <NewsletterBox />
        </div>
        <aside className="stack" aria-labelledby="nl-explain">
          <h2 id="nl-explain" style={{ fontSize: '1.125rem' }}>{t.explainTitle}</h2>
          <p>{t.topics}</p>
          <p>{t.region}</p>
          <p className="muted">{t.freq}</p>
          <p className="notice">{t.alt} <Link to={lp('/events#abo')}>{t.altLink}</Link></p>
        </aside>
      </div>
    </>
  )
}
