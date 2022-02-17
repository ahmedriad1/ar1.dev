import { ActionFunction, json, redirect } from 'remix'
import { validateToken } from '~/utils/post-api-key.server'
import { parseRedirects } from '~/utils/redirects'

export const action: ActionFunction = async ({ request }) => {
  try {
    if (!validateToken(request))
      return new Response(JSON.stringify({ ok: false }), { status: 401 })

    const data = await request.json()
    const redirectsFile = data.redirects
    console.log(`Updating redirects file...`)
    await REDIRECTS.put(
      '$$redirects',
      JSON.stringify(parseRedirects(redirectsFile)),
    )
    console.log(`Redirects updated.`)

    return json({ ok: true })
  } catch (e) {
    return json({ ok: false })
  }
}

export const loader = () => redirect('/', { status: 404 })
