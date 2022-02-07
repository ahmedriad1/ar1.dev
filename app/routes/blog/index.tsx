import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import Button from '~/components/Button'
import Card from '~/components/Card'
import Container from '~/components/Container'
import Image from '~/components/Image'
import { H3 } from '~/components/Typography'
import type { Handle, Post } from '~/types'
import { config } from '~/utils/constants'
import { getAllPosts } from '~/utils/posts.server'

export const handle: Handle = {
  id: 'blog',
  getSitemapEntries: () => [{ route: `/blog`, priority: 0.7 }],
}

type LoaderData = {
  posts: {
    slug: string
    frontmatter: Post['frontmatter']
  }[]
}

export const loader: LoaderFunction = async () => {
  const posts = await getAllPosts()

  const data: LoaderData = {
    posts,
  }

  return json(data)
}

export const meta: MetaFunction = () => ({
  title: `Blog - ${config.title}`,
})

export default function Index() {
  const { posts } = useLoaderData<LoaderData>()
  const featured = posts[0]

  return (
    <Container layout>
      {featured ? (
        <Card className="w-full flex flex-col sm:flex-row h-auto sm:min-h-[300px]">
          <div className="h-[300px] sm:h-auto w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[550px] relative">
            <Image
              blurDataUrl={featured.frontmatter.imageBlurDataUrl}
              src={featured.frontmatter.image}
              className="w-full h-full object-cover"
              alt="Post image"
            />
          </div>
          <div className="w-full flex-1 text-white grid items-center p-5">
            <div>
              <span className="text-slate-600 dark:text-primary-lighter text-xs font-medium">
                {Math.round(featured.frontmatter.readingTime.minutes)} min read
              </span>
              <H3 className="mt-2">{featured.frontmatter.title}</H3>
              <p className="text-slate-800 dark:text-light mt-4 text-sm line-clamp-3 lg:line-clamp-none">
                {featured.frontmatter.excerpt}
              </p>
              <Link to={featured.slug}>
                <Button className="mt-8">Read</Button>
              </Link>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
        {posts.map((post, idx) => (
          <Card
            key={idx}
            className="w-full text-white p-8 flex flex-col justify-between"
          >
            <div>
              <H3>{post.frontmatter.title}</H3>
              <p className="text-slate-800 dark:text-light mt-6 text-sm line-clamp-4">
                {post.frontmatter.excerpt}
              </p>
            </div>
            <Link to={post.slug}>
              <Button className="mt-10">Read</Button>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  )
}
