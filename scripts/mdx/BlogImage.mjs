import React, { useMemo } from 'react'
import { getImageProps } from './image.mjs'

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

const Image = ({
  src,
  blurDataUrl,
  className = 'w-full h-full rounded-lg object-cover',
  ...props
}) => {
  const imgProps = useMemo(() => {
    return getImageProps(src)
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
