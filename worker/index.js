import {
  createRequestHandler,
  handleAsset,
} from '@remix-run/cloudflare-workers'
import * as build from '../build'

const handler = createRequestHandler({ build })

const handleRedirect = async event => {
  const asset = await handleAsset(event)
  if (asset) return asset

  const path = new URL(event.request.url).pathname
  const location = await REDIRECTS.get(path)
  if (location) return Response.redirect(location, 307)

  return handler(event)
}

addEventListener('fetch', event => {
  event.respondWith(handleRedirect(event))
})
