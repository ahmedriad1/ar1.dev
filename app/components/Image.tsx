import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getUnsplashImageProps,
  isUnsplashImg,
  useSSRLayoutEffect,
} from '~/utils/other'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  blurDataUrl?: string
}

const Image: React.FC<ImageProps> = ({
  src,
  blurDataUrl,
  className = 'w-full h-full rounded-lg object-cover',
  ...props
}) => {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const imgProps = useMemo(() => {
    return isUnsplashImg(src || '')
      ? getUnsplashImageProps(src as string)
      : { src }
  }, [src])

  useSSRLayoutEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  useEffect(() => {
    if (!ref.current || ref.current.complete) return
    let current = true
    ref.current.addEventListener('load', () => {
      if (!ref.current || !current) return
      setTimeout(() => {
        setLoaded(true)
      }, 0)
    })

    return () => {
      current = false
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      {blurDataUrl ? (
        <>
          <img
            src={blurDataUrl}
            className={clsx('absolute inset-0 w-full h-full', className)}
            key={blurDataUrl}
          />
          <div
            className={clsx(
              'absolute inset-0 w-full h-full backdrop-blur-xl',
              className,
            )}
          />
        </>
      ) : (
        <div
          className={clsx(
            'absolute inset-0 w-full h-full bg-primary-lighter',
            className,
          )}
        />
      )}
      <img
        {...imgProps}
        ref={ref}
        className={clsx(
          'absolute inset-0 w-full h-full transition-opacity',
          !loaded && 'opacity-0',
          className,
        )}
        {...props}
      />
    </div>
  )
}
export default Image
