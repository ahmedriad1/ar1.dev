import {
  json,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix'
import Nav from './components/Nav'
import Spacer from './components/Spacer'
import tailwindStyles from './styles/tailwind.css'
import appStyles from './styles/global.css'
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from './utils/theme-provider'
import clsx from 'clsx'
import { getThemeSession } from './utils/theme.server'
import type { MetaFunction, LinksFunction } from 'remix'
import Footer from './components/Footer'
import { getSocialMetas } from './utils/seo'
import { Handle } from './types'
import { ErrorPage } from './components/Error'
import { PageLoadingMessage } from './components/PageLoadingMessage'

export const handle: Handle = {
  id: 'root',
}

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap',
    },
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/logo-dark.svg',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      sizes: '32x32',
      href: '/logo-dark.svg',
    },
  ]
}

export const meta: MetaFunction = () => {
  return {
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
    'theme-color': '#5765c5',
    ...getSocialMetas(),
  }
}

type LoaderData = {
  requestInfo: {
    session: {
      theme: Theme | null
    }
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeSession(request)

  const data: LoaderData = {
    requestInfo: {
      session: {
        theme: theme.getTheme(),
      },
    },
  }

  return json(data)
}

function App() {
  const data = useLoaderData<LoaderData>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls
          ssrTheme={Boolean(data.requestInfo.session.theme)}
        />
      </head>
      <body className="w-full min-h-screen flex flex-col bg-white dark:bg-primary text-black dark:text-white  overflow-x-hidden">
        <PageLoadingMessage />
        <Nav />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Spacer size="base" />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>()

  return (
    <ThemeProvider specifiedTheme={data.requestInfo.session.theme}>
      <App />
    </ThemeProvider>
  )
}

function ErrorDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full min-h-screen bg-primary text-white flex flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <ErrorDocument>
      <ErrorPage
        heroProps={{ title: '500 - Something went wrong' }}
        layout="full"
        error={error}
      />
    </ErrorDocument>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  console.error('CatchBoundary', caught)

  if (caught.status === 404) {
    return (
      <ErrorDocument>
        <ErrorPage
          heroProps={{ title: "404 - Looks like you're lost" }}
          layout="full"
        />
      </ErrorDocument>
    )
  }

  throw new Error(`Unhandled error: ${caught.status}`)
}
