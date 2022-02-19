import React from 'react'

export const useSSRLayoutEffect =
  typeof window === 'undefined' ? () => {} : React.useLayoutEffect

export function forwardRefWithAs<
  T extends { name: string; displayName?: string },
>(component: T): T & { displayName: string } {
  return Object.assign(React.forwardRef(component as unknown as any) as any, {
    displayName: component.displayName ?? component.name,
  })
}

export const isBrowser = () => typeof window !== 'undefined'

export const typedBoolean = <T>(
  value: T,
): value is Exclude<T, '' | 0 | false | null | undefined> => Boolean(value)

export const getDomainUrl = (request: Request) => {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

  if (!host) throw new Error('Could not determine domain URL.')

  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export const removeTrailingSlash = (s: string) =>
  s.endsWith('/') ? s.slice(0, -1) : s
