import { createCookieSessionStorage } from 'remix'
import { Theme, isTheme } from './theme-provider'

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    secure: true,
    secrets: [COOKIE_SECRET],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
})

export const getThemeSession = async (request: Request) => {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))

  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      return isTheme(themeValue) ? themeValue : Theme.DARK
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  }
}
