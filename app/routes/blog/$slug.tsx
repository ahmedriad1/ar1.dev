import {
  HeadersFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix'
import { useMdxComponent } from '~/utils/mdx'
import proseStyles from '~/styles/prose.css'
import { Handle, Post } from '~/types'
import Container from '~/components/Container'
import Spacer from '~/components/Spacer'
import { H1, H6 } from '~/components/Typography'
import DateFormatter from '~/components/Date'
import Image from '~/components/Image'
import { getSeoImage, getSocialMetas } from '~/utils/seo'
import { getAllPosts, getPostBySlug } from '~/utils/posts.server'

export const handle: Handle = {
  id: 'blog-post',
  getSitemapEntries: async () => {
    const posts = await getAllPosts()

    return posts.map(post => {
      return { route: `/blog/${post.slug}`, priority: 0.7 }
    })
  },
}

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: proseStyles,
  },
]

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders

type LoaderData = {
  slug: string
  frontmatter: Post['frontmatter']
  code?: string
  html: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { slug } = params
  if (!slug) throw new Response('Not Found', { status: 404 })

  const data = await getPostBySlug(slug)
  if (!data) throw new Response('Not Found', { status: 404 })

  const { frontmatter, code, html } = data

  const post: LoaderData = {
    slug,
    frontmatter,
    code,
    html,
  }

  return json(post)
}

export let meta: MetaFunction = ({ data }) => {
  const post = data as LoaderData
  if (!post)
    return getSocialMetas({
      title: 'Not found',
      description: "Looks like you're lost",
    })

  return getSocialMetas({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    image:
      getSeoImage(post.frontmatter?.meta?.image || post.frontmatter.image) ||
      undefined,
    keywords: post.frontmatter?.meta?.keywords,
  })
}

export default function Post() {
  const { frontmatter, code, html } = useLoaderData<LoaderData>()
  const MdxComponent = useMdxComponent({ code, html })

  return (
    <Container layout>
      <div className="max-w-4xl 2xl:max-w-5xl mx-auto">
        <Spacer size="2xs" />
        <H1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none text-left">
          {frontmatter.title}
        </H1>

        <span className="block mt-4 text-gray-500 dark:text-primary-lighter font-medium">
          <DateFormatter dateString={frontmatter.date} />
        </span>

        {frontmatter.excerpt ? (
          <H6 as="p" className="mt-8 text-gray-600 dark:text-light">
            {frontmatter.excerpt}
          </H6>
        ) : null}

        <div className="aspect-[2/1] md:aspect-[2/1] mx-auto relative mt-10 overflow-hidden">
          <Image
            className="w-full h-full rounded-lg object-cover"
            src={frontmatter.image}
            blurDataUrl={frontmatter.imageBlurDataUrl}
            alt="Post cover"
          />
        </div>
      </div>

      {MdxComponent ? <MdxComponent className="mt-10" /> : null}
    </Container>
  )
}
