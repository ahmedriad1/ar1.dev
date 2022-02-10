// import {pathToRegexp, compile as compileRedirectPath, Key} from 'path-to-regexp'
import { typedBoolean } from './other'

export const parseRedirects = (redirectsString: string) => {
  return redirectsString
    .split('\n')
    .map((line, lineNumber) => {
      if (!line.trim() || line.startsWith('#')) return null

      const [from, to] = line
        .split(' ')
        .map(l => l.trim())
        .filter(Boolean)

      if (!from || !to) {
        console.error(`Invalid redirect on line ${lineNumber + 1}: "${line}"`)
        return null
      }

      return {
        from,
        to,
      }
    })
    .filter(typedBoolean)
}
