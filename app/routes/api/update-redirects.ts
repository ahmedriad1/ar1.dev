import { ActionFunction, json, redirect } from 'remix'
import { validateToken } from '~/utils/post-api-key.server'
import { parseRedirects } from '~/utils/redirects'

declare var REDIRECTS: KVNamespace

export const action: ActionFunction = async ({ request }) => {
  try {
    if (!validateToken(request))
      return new Response(JSON.stringify({ ok: false }), { status: 401 })

    const data = await request.json()
    const redirectsFile = data.redirects
    console.log(`Updating redirects file...`)
    await Promise.all(
      parseRedirects(redirectsFile).map(redirect =>
        REDIRECTS.put(redirect.from, redirect.to),
      ),
    )
    console.log(`Redirects updated.`)

    return json({ ok: true })
  } catch (e) {
    return json({ ok: false })
  }
}

export const loader = () => redirect('/', { status: 404 })
