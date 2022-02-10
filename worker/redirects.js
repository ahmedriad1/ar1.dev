import { compile as compileRedirectPath } from 'path-to-regexp'

const getPathname = (url, params) =>
  compileRedirectPath(url, {
    encode: encodeURIComponent,
  })(params)

/**
 *
 * @param {Request} req
 * @returns {string | null}
 */
export async function matchRedirect(req) {
  const redirects = (await REDIRECTS.get('$$redirects', 'json')) || []
  const host = req.headers.get('X-Forwarded-Host') ?? req.headers.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'

  const reqUrl = new URL(`${protocol}://${host}${req.url}`)

  for (const redirect of redirects) {
    if (
      !redirect.methods.includes('*') &&
      !redirect.methods.includes(req.method)
    )
      continue

    const match = reqUrl.pathname.match(new RegExp(redirect.from))
    if (!match) continue

    const params = {}
    const paramValues = match.slice(1)
    for (let paramIndex = 0; paramIndex < paramValues.length; paramIndex++) {
      const paramValue = paramValues[paramIndex]
      const key = redirect.keys[paramIndex]
      if (key && paramValue) params[key.name] = paramValue
    }

    const toUrl = new URL(redirect.toUrl)

    toUrl.protocol = protocol
    if (toUrl.host === 'same_host') toUrl.host = reqUrl.host

    for (const [key, value] of reqUrl.searchParams.entries())
      toUrl.searchParams.append(key, value)

    toUrl.pathname = getPathname(redirect.toUrl, params)
    return toUrl.toString()
  }
}
