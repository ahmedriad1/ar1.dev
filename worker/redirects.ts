import { compile as compileRedirectPath } from 'path-to-regexp'
import type { Key } from 'path-to-regexp'

interface Redirect {
  methods: string[]
  keys: Key[]
  from: string
  toUrl: string
}

const getPathname = (pathname: string, params: any) =>
  compileRedirectPath(pathname, {
    encode: encodeURIComponent,
  })(params)

/**
 *
 * @param {Request} req
 */
export async function matchRedirect(req: Request) {
  const redirects: Redirect[] =
    (await REDIRECTS.get('$$redirects', 'json')) || []

  const reqUrl = new URL(req.url)

  for (const redirect of redirects) {
    if (
      !redirect.methods.includes('*') &&
      !redirect.methods.includes(req.method)
    )
      continue

    const match = reqUrl.pathname.match(new RegExp(redirect.from))
    if (!match) continue

    const params: Record<Key['name'], string> = {}

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
