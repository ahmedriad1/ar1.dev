import {
  createRequestHandler,
  handleAsset,
} from '@remix-run/cloudflare-workers'
import * as build from '../build'
import { matchRedirect } from './redirects'

const handler = createRequestHandler({ build })

const handleRedirect = async event => {
  const asset = await handleAsset(event, build)
  if (asset) return asset

  const location = await matchRedirect(event.request)
  if (location) return Response.redirect(location, 307)
  return handler(event)
}

addEventListener('fetch', event => {
  event.respondWith(handleRedirect(event))
})
