import fetch from 'node-fetch'

const SIZES = ['280', '560', '840', '1100', '1650', '2100', '2500', '3100']

export const UnsplashImageProvider = {
  getProps(src) {
    const id = this.getId(src)
    const baseUrl = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=auto`

    return {
      sizes:
        '(max-width:1023px) 80vw, (min-width:1024px) and (max-width:1620px) 67vw, 1100px',
      srcSet: SIZES.map(size => `${baseUrl}&w=${size} ${size}w`).join(', '),
      src: `${baseUrl}&w=1517`,
    }
  },
  supportsProvider(src) {
    return src.startsWith('unsplash/')
  },
  getId(src) {
    return src.split('/')[1]
  },
  getPlaceholder(src) {
    const id = this.getId(src)
    return fetchImage(
      `https://images.unsplash.com/${id}?fm=webp&fit=crop&q=auto&blur=100&w=100`,
    )
  },
}

export const CloudinaryImageProvider = {
  getProps(src) {
    const id = this.getId(src)

    return {
      sizes:
        '(max-width:1023px) 80vw, (min-width:1024px) and (max-width:1620px) 67vw, 1100px',
      srcSet: SIZES.map(
        size =>
          `https://res.cloudinary.com/ar1-dev/w_${size},c_fit,q_auto,f_auto/${id} ${size}w`,
      ).join(', '),
      src: `https://res.cloudinary.com/ar1-dev/w_1517,c_fit,q_auto,f_auto/${id}`,
    }
  },
  supportsProvider(src) {
    return src.startsWith('cloudinary/')
  },
  getId(src) {
    return src.split('/')[1]
  },
  getPlaceholder(src) {
    const id = this.getId(src)
    return fetchImage(
      `https://res.cloudinary.com/ar1-dev/w_100,c_fill,q_auto,f_webp,e_blur:1000/${id}`,
    )
  },
}

export const Ar1ImageProvider = {
  getProps(src) {
    const id = this.getId(src)
    const baseUrl = `https://images.ar1.dev/${id}?auto=format&fit=crop&q=auto`

    return {
      sizes:
        '(max-width:1023px) 80vw, (min-width:1024px) and (max-width:1620px) 67vw, 1100px',
      srcSet: SIZES.map(size => `${baseUrl}&w=${size} ${size}w`).join(', '),
      src: `${baseUrl}&w=1517`,
    }
  },
  supportsProvider(src) {
    return src.startsWith('ar1/')
  },
  getId(src) {
    return src.split('/')[1]
  },
  getPlaceholder(src) {
    const id = this.getId(src)
    return fetchImage(
      `https://images.ar1.dev/${id}?fm=webp&fit=crop&q=auto&blur=100&w=100`,
    )
  },
}

const providers = [
  UnsplashImageProvider,
  CloudinaryImageProvider,
  Ar1ImageProvider,
]

export const getImageProps = src => {
  const provider = providers.find(provider => provider.supportsProvider(src))
  if (provider) return provider.getProps(src)

  return { src }
}

const fetchImage = async url => {
  const img = await fetch(url)
  const base64 = Buffer.from(await img.arrayBuffer()).toString('base64')
  return `data:${img.headers.get('content-type')};base64,${base64}`
}

export const getImagePlaceholder = async src => {
  if (!src) return null

  const provider = providers.find(provider => provider.supportsProvider(src))
  if (provider) return provider.getPlaceholder(src)

  return null
}
