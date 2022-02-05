import { createEventHandler } from '@remix-run/cloudflare-workers'

import * as build from '../build'

const handler = createEventHandler({ build })
const handleFetch = event => {
  const url = new URL(event.request.url)
  handler(event)
}
addEventListener('fetch', handleFetch)
