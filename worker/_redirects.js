module.exports = async event => {
  const path = new URL(event.request.url).pathname
  const location = await REDIRECTS.get(path)

  if (location) return Response.redirect(location, 307)

  return null
}
