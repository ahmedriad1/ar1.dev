import React from 'react'

export const useSSRLayoutEffect =
  typeof window === 'undefined' ? () => {} : React.useLayoutEffect

export const getUnsplashImageProps = (src: string) => {
  const id = getUnsplashId(src)
  const baseUrl = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=auto`
  const sizes = ['280', '560', '840', '1100', '1650', '2100', '2500', '3100']

  return {
    sizes:
      '(max-width:1023px) 80vw, (min-width:1024px) and (max-width:1620px) 67vw, 1100px',
    srcSet: sizes.map(size => `${baseUrl}&w=${size} ${size}w`).join(', '),
    src: `${baseUrl}&w=1517`,
  }
}

export const isBrowser = () => typeof window !== 'undefined'

export const isUnsplashImg = (src: string) => src.startsWith('unsplash/')
export const getUnsplashId = (src: string) => src.split('/')[1]

export const typedBoolean = <T>(
  value: T,
): value is Exclude<T, '' | 0 | false | null | undefined> => Boolean(value)

export const getDomainUrl = (request: Request) => {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')
  if (!host) {
    throw new Error('Could not determine domain URL.')
  }
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export const removeTrailingSlash = (s: string) =>
  s.endsWith('/') ? s.slice(0, -1) : s
