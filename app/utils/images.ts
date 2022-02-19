type ImageProps = {
  sizes: string
  srcSet: string
  src: string
}

interface ImageProvider {
  getProps: (src: string) => ImageProps
  supportsProvider: (src: string) => boolean
  getId: (src: string) => string
  getSeoImage: (src: string) => string
}

const SIZES = ['280', '560', '840', '1100', '1650', '2100', '2500', '3100']

export const UnsplashImageProvider: ImageProvider = {
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
  getSeoImage(src) {
    const id = this.getId(src)
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&h=628&q=70`
  },
}

export const CloudinaryImageProvider: ImageProvider = {
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
  getSeoImage(src) {
    const id = this.getId(src)
    return `https://res.cloudinary.com/ar1-dev/w_1200,h_628,c_fill,q_70,f_auto/${id}`
  },
}

export const Ar1ImageProvider: ImageProvider = {
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
  getSeoImage(src) {
    const id = this.getId(src)
    return `https://images.ar1.dev/${id}?auto=format&fit=crop&w=1200&h=628&q=70`
  },
}

const providers: ImageProvider[] = [
  UnsplashImageProvider,
  CloudinaryImageProvider,
  Ar1ImageProvider,
]

export const getImageProps = (src: string) => {
  const provider = providers.find(provider => provider.supportsProvider(src))
  if (provider) return provider.getProps(src)

  return { src }
}

export const getSeoImage = (src: string) => {
  const provider = providers.find(provider => provider.supportsProvider(src))
  if (provider) return provider.getSeoImage(src)

  return src
}
