import type { ActionFunction } from 'remix'
import { json, redirect } from 'remix'
import { deletePostBySlug, withApiToken } from '~/utils/posts.server'

export const action: ActionFunction = withApiToken(async ({ request }) => {
  try {
    const data = await request.json()
    if (!data.slug) return json({ error: 'No slug provided' })
    await deletePostBySlug(data)

    return json({ success: true })
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack })
  }
})

export const loader = () => redirect('/', { status: 404 })
