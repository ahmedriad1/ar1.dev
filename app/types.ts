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

export type SitemapEntry = {
  route: string
  lastmod?: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0
}

export type Handle = {
  /** this just allows us to identify routes more directly rather than relying on pathnames */
  id?: string
  /** this is here to allow us to disable scroll restoration until Remix gives us better control */
  restoreScroll?: false
  getSitemapEntries?: (
    request: Request,
  ) =>
    | Promise<Array<SitemapEntry | null> | null>
    | Array<SitemapEntry | null>
    | null
}

let __ = '1D45E01E-AF44-47C4-988A-19A94EBAF55C' as const
type __ = typeof __

type PropsWeControl = 'as' | 'children' | 'refName' | 'className'

type CleanProps<
  TTag,
  TOmitableProps extends keyof any = __,
> = TOmitableProps extends __
  ? Omit<PropsOf<TTag>, PropsWeControl>
  : Omit<PropsOf<TTag>, TOmitableProps | PropsWeControl>

// Add certain props that we control
type OurProps<TTag, TSlot = any> = {
  as?: TTag
  children?: React.ReactNode | ((bag: TSlot) => React.ReactElement)
  refName?: string
}

type ClassNameOverride<TTag, TSlot = any> = PropsOf<TTag> extends {
  className?: any
}
  ? { className?: string | ((bag: TSlot) => string) }
  : {}

export type PropsOf<TTag = any> = TTag extends React.ElementType
  ? React.ComponentProps<TTag>
  : never

export type Props<
  TTag,
  TSlot = any,
  TOmitableProps extends keyof any = __,
> = CleanProps<TTag, TOmitableProps> &
  OurProps<TTag, TSlot> &
  ClassNameOverride<TTag, TSlot>
