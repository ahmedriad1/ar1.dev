import { validateToken } from '~/utils/post-api-key.server'
import { ActionFunction, json, redirect } from 'remix'
declare var CONTENT: KVNamespace

export const action: ActionFunction = async ({ request }) => {
  try {
    if (!validateToken(request))
      return new Response(`Unauthorized`, { status: 401 })
    const data = await request.json()
    await CONTENT.put('$$content-sha', JSON.stringify(data))
    return json({ success: true })
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack })
  }
}

export const loader = () => redirect('/', { status: 404 })
