declare var POST_API_KEY: string

export const validateToken = (request: Request) => {
  const key = request.headers.get('Authorization')
  if (key !== `Bearer ${POST_API_KEY}`) return false
  return true
}
