import { config } from './constants'
import { getUnsplashId, isUnsplashImg } from './other'

export const getSeoImage = (image: string) => {
  if (!isUnsplashImg(image)) return image
  const id = getUnsplashId(image)

  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&h=628&q=70`
}

export function getSocialMetas({
  title,
  description = config.description,
  keywords,
  image = config.image,
}: {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
} = {}) {
  const siteTitle = title ? `${title} | ${config.title}` : config.title
  const siteKeywords = keywords
    ? [...config.keywords, ...keywords].join(', ')
    : config.keywords.join(', ')

  return {
    title: siteTitle,
    description,
    keywords: siteKeywords,
    image,
    'og:url': config.url,
    'og:title': siteTitle,
    'og:description': description,
    'og:image': image,
    'twitter:card': 'summary_large_image',
    'twitter:creator': config.social.twitter,
    'twitter:site': config.social.twitter,
    'twitter:title': siteTitle,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:alt': siteTitle,
  }
}
