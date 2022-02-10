import { compile as compileRedirectPath } from 'path-to-regexp'

const getPathname = (pathname, params) =>
  compileRedirectPath(pathname, {
    encode: encodeURIComponent,
  })(params)

/**
 *
 * @param {Request} req
 */
export async function matchRedirect(req) {
  const redirects = (await REDIRECTS.get('$$redirects', 'json')) || []

  const reqUrl = new URL(req.url)

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

    toUrl.protocol = reqUrl.protocol
    if (toUrl.host === 'same_host') toUrl.host = reqUrl.host

    for (const [key, value] of reqUrl.searchParams.entries())
      toUrl.searchParams.append(key, value)

    toUrl.pathname = getPathname(toUrl.pathname, params)
    return toUrl.toString()
  }

  return null
}
