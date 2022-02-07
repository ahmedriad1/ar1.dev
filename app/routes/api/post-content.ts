import { ActionFunction, json, redirect } from 'remix'
import { validateToken } from '~/utils/post-api-key.server'
declare var CONTENT: KVNamespace

export const action: ActionFunction = async ({ request }) => {
  try {
    if (!validateToken(request))
      return new Response(request.url, { status: 401 })

    const data = await request.json()
    const stringifiedData = JSON.stringify(data)
    console.log(`Adding post for: ${data.slug}`)

    await CONTENT.put(data.slug, stringifiedData)
    // console.log(`Content updated: ${data.slug}`)

    return json({ success: true })
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack })
  }
}

export const loader = () => redirect('/', { status: 404 })
