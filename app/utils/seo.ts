export const config = {
  title: 'Ahmed',
  description: `I'm Ahmed, a javascript enthusiast, full-stack developer, coffee-lover, and a student.`,
  social: {
    twitter: '@ahmedriad1_',
  },
  image: 'https://ar1.dev/images/banner.jpg',
  url: 'https://ar1.dev',
  keywords: [
    'ahmed',
    'riad',
    'Ahmed Riad',
    'ahmed riad',
    'ar1',
    'javascript',
    'blog',
    'portfolio',
    'dev',
    'typescript',
    'web',
    'web dev',
    'web development',
    'backend',
    'frontend',
  ],
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
