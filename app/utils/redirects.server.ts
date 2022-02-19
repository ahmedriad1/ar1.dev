import { pathToRegexp, Key } from 'path-to-regexp'
import { typedBoolean } from './other'

const parseRedirects = (redirectsString: string) => {
  const possibleMethods = ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', '*']

  return redirectsString
    .split('\n')
    .map((line, lineNumber) => {
      if (!line.trim() || line.startsWith('#')) return null

      let methods, from, to
      const [one, two, three] = line
        .split(' ')
        .map(l => l.trim())
        .filter(Boolean)
      if (!one) return null

      const splitOne = one.split(',')
      if (possibleMethods.some(m => splitOne.includes(m))) {
        methods = splitOne
        from = two
        to = three
      } else {
        methods = ['*']
        from = one
        to = two
      }

      if (!from || !to) {
        console.error(`Invalid redirect on line ${lineNumber + 1}: "${line}"`)
        return null
      }

      const keys: Array<Key> = []

      const toUrl = to.includes('//')
        ? new URL(to)
        : new URL(`https://same_host${to}`)

      try {
        return {
          methods,
          keys,
          from: pathToRegexp(from, keys).source,
          toUrl: toUrl.toString(),
        }
      } catch (error: unknown) {
        // if parsing the redirect fails, we'll warn, but we won't crash
        console.error(
          `Failed to parse redirect on line ${lineNumber}: "${line}"`,
        )
        return null
      }
    })
    .filter(typedBoolean)
}

export const saveRedirects = async (redirectsFile: any) => {
  console.log(`Updating redirects file...`)

  await REDIRECTS.put(
    '$$redirects',
    JSON.stringify(parseRedirects(redirectsFile)),
  )

  console.log(`Redirects updated.`)
}
