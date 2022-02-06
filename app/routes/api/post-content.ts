import { ActionFunction, json } from 'remix'
import { validateToken } from '~/utils/post-api-key.server'
declare var CONTENT: KVNamespace

export const action: ActionFunction = async ({ request }) => {
  try {
    if (!validateToken(request))
      return new Response(`Unauthorized`, { status: 401 })

    const data = await request.json()
    await CONTENT.put(data.slug, JSON.stringify(data))
    console.log(`Content updated: ${data.slug}`)

    return json({ success: true })
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack })
  }
}
