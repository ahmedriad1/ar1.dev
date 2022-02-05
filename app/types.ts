import type { IReadTimeResults } from 'reading-time'

export interface Post {
  slug: string
  frontmatter: {
    title: string
    excerpt: string
    image: string
    imageBlurDataUrl?: string
    date: string
    slug: string
    readingTime: IReadTimeResults
    meta: {
      image?: string
      keywords: string[]
    }
  }
  html: string
  code?: string
  hash?: string
}
