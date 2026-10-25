import { Link } from 'react-router-dom'
import { useLp } from '../i18n'

/**
 * Brand slot: a plain text wordmark. If the concept is adopted, the official
 * logo replaces the contents of this component (and nothing else).
 */
export function Logo() {
  const lp = useLp()
  return (
    <Link to={lp('/')} className="logo">
      YoungNet Hub <span>(Konzept)</span>
    </Link>
  )
}
