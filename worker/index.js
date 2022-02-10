import { createEventHandler } from '@remix-run/cloudflare-workers'
import * as build from '../build'
import handleRedirect from './_redirects'

const handler = createEventHandler({ build })

addEventListener('fetch', async event => {
  const redirect = await handleRedirect(event)
  if (redirect) return event.respondWith(redirect)

  handler(event)
})
