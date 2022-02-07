declare var POST_API_KEY: string

export const validateToken = (request: Request) => {
  const host = new URL(request.url).hostname
  if (host === 'localhost' || host === '127.0.0.1') return true

  const key = request.headers.get('Authorization')
  if (key !== `Bearer ${POST_API_KEY}`) return false
  return true
}
