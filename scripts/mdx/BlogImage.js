import React, { useMemo } from 'react'

function toVal(mix) {
  var k,
    y,
    str = ''

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

function clsx() {
  var i = 0,
    tmp,
    x,
    str = ''
  while (i < arguments.length) {
    if ((tmp = arguments[i++])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ')
        str += x
      }
    }
  }
  return str
}

const getUnsplashImageProps = src => {
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

const isUnsplashImg = src => src.startsWith('unsplash/')
const getUnsplashId = src => src.split('/')[1]

const Image = ({
  src,
  blurDataUrl,
  className = 'w-full h-full rounded-lg object-cover',
  ...props
}) => {
  const imgProps = useMemo(() => {
    return isUnsplashImg(src || '') ? getUnsplashImageProps(src) : { src }
  }, [src])

  return React.createElement('div', {
    className: 'relative w-full h-full',
    children: [
      blurDataUrl
        ? React.Fragment({
            children: [
              React.createElement('img', {
                src: blurDataUrl,
                className: clsx('absolute inset-0 w-full h-full', className),
                key: blurDataUrl,
              }),
              React.createElement('div', {
                className: clsx(
                  'absolute inset-0 w-full h-full backdrop-blur-xl',
                  className,
                ),
              }),
            ],
          })
        : React.createElement('div', {
            className: clsx(
              'absolute inset-0 w-full h-full bg-primary-lighter',
              className,
            ),
          }),
      React.createElement('img', {
        ...imgProps,
        className: clsx(
          'absolute inset-0 w-full h-full transition-opacity',
          className,
        ),
        ...props,
      }),
    ],
  })
}
export default Image
