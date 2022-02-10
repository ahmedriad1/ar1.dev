import { createEventHandler } from '@remix-run/cloudflare-workers'
import * as build from '../build'

const handler = createEventHandler({ build })

const handleRedirect = async event => {
  const path = new URL(event.request.url).pathname
  const location = await REDIRECTS.get(path)

  if (location) return Response.redirect(location, 307)

  return null
}

const handleRequest = async event => {
  const redirect = await handleRedirect(event)
  if (redirect) return event.respondWith(redirect)
  handler(event)
}

addEventListener('fetch', handleRequest)
