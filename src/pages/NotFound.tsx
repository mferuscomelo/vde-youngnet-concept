import { Link } from 'react-router-dom'
import { PageHeader } from '../components/Badges'
import { useLp, useT } from '../i18n'
import { info } from '../i18n/info'

export default function NotFound() {
  const t = useT(info).notFound
  const lp = useLp()
  return (
    <>
      <PageHeader title={t.title} lead={t.lead} />
      <div className="row">
        <Link className="btn btn-cta" to={lp('/')}>{t.home}</Link>
        <Link className="btn" to={lp('/events')}>{t.events}</Link>
      </div>
    </>
  )
}
