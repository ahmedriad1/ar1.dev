import { ActionFunction, json, redirect } from 'remix'
import { withApiToken } from '~/utils/posts.server'
import { saveRedirects } from '~/utils/redirects.server'

export const action: ActionFunction = withApiToken(async ({ request }) => {
  try {
    const data = await request.json()
    const redirectsFile = data.redirects
    await saveRedirects(redirectsFile)

    return json({ ok: true })
  } catch (e) {
    return json({ ok: false })
  }
})

export const loader = () => redirect('/', { status: 404 })
