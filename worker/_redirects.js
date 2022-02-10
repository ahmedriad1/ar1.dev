const redirects = new Map([
  ['/github', 'https://github.com/ahmedriad1'],
  ['/twitter', 'https://twitter.com/ahmedriad1_'],
])

module.exports = event => {
  const path = new URL(event.request.url).pathname
  const location = redirects.get(path)

  if (location) return Response.redirect(location, 307)

  return null
}
