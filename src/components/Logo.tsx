import { Link } from 'react-router-dom'
import { useLang, useLp } from '../i18n'
import { asset } from '../lib/asset'

/**
 * Brand slot: the official VDE logo and "YOUNG NET" wordmark as served on
 * vde.com/youngnet (public/brand), plus a concept label.
 */
export function Logo() {
  const lp = useLp()
  const tag = useLang() === 'en' ? 'Concept' : 'Konzept'
  return (
    <Link to={lp('/')} className="logo" aria-label={`VDE Young Net Hub (${tag})`}>
      <img className="logo-vde" src={asset('brand/vde-logo.svg')} alt="" width="117" height="50" />
      <img className="logo-additional" src={asset('brand/young-net.svg')} alt="" width="400" height="50" />
      <span className="logo-tag" aria-hidden="true">{tag}</span>
    </Link>
  )
}
