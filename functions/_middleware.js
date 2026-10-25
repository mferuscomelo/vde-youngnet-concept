// Cloudflare Pages middleware: HTTP Basic Auth for the whole preview, plus
// noindex on every response. Set HUB_PASSWORD (and optionally HUB_USER) as
// encrypted environment variables in the Pages project settings.
// ICS feeds stay behind the password too; calendar apps that subscribe need
// the credentials in the URL (https://user:pass@host/ics/...) or a separate token.
export async function onRequest({ request, env, next }) {
  const user = env.HUB_USER || 'youngnet'
  const pass = env.HUB_PASSWORD
  if (!pass) return new Response('HUB_PASSWORD not configured', { status: 503 })

  const header = request.headers.get('Authorization') || ''
  const [scheme, encoded] = header.split(' ')
  let authorised = false
  if (scheme === 'Basic' && encoded) {
    const decoded = atob(encoded)
    const i = decoded.indexOf(':')
    authorised = decoded.slice(0, i) === user && decoded.slice(i + 1) === pass
  }
  if (!authorised) {
    return new Response('Konzept-Prototyp – Zugang nur mit Passwort.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="YoungNet Hub Konzept", charset="UTF-8"', 'X-Robots-Tag': 'noindex, nofollow' },
    })
  }
  const res = await next()
  const out = new Response(res.body, res)
  out.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return out
}
