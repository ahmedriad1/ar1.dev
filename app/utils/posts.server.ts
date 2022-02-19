import type { ActionFunction } from 'remix'
import type { Post } from '~/types'

export const withApiToken = (actionFn: ActionFunction): ActionFunction => {
  return async args => {
    const { request } = args

    const host = new URL(request.url).hostname
    if (host === 'localhost' || host === '127.0.0.1') return true

    const key = request.headers.get('Authorization')
    if (key !== `Bearer ${POST_API_KEY}`)
      return new Response(request.url, { status: 401 })

    return actionFn(args)
  }
}

export const getAllPosts = async () => {
  const slugs = await CONTENT.list({ prefix: 'blog/' })

  const posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      const data = await CONTENT.get(name, 'json')
      const { slug, frontmatter } = data as Post
      return { slug: slug.split('/')[1], frontmatter }
    }),
  )

  return posts
}

export const getPostBySlug = async (slug: string) => {
  const data = await CONTENT.get(`blog/${slug}`, 'json')
  if (!data) return null
  return data as Post
}

export const savePost = async (data: any) => {
  const stringifiedData = JSON.stringify(data)
  console.log(`Adding post for: ${data.slug}`)

  await CONTENT.put(data.slug, stringifiedData)
}
