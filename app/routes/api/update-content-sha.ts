import { ActionFunction, json, redirect } from 'remix'
import { withApiToken } from '~/utils/posts.server'

export const action: ActionFunction = withApiToken(async ({ request }) => {
  try {
    const data = await request.json()
    await CONTENT.put('$$content-sha', JSON.stringify(data))
    return json({ success: true })
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack })
  }
})
export const loader = () => redirect('/', { status: 404 })
