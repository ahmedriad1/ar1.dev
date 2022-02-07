import type { Post } from '~/types'

declare var CONTENT: KVNamespace

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
