import { createEventHandler } from '@remix-run/cloudflare-workers'
import * as build from '../build'
import handleRedirect from './_redirects'

const handler = createEventHandler({ build })

addEventListener('fetch', event => {
  const redirect = handleRedirect(event)
  if (redirect) return event.respondWith(redirect)

  handler(event)
})
