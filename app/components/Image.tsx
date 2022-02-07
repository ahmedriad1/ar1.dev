import { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react'

const classNames = (...args: any[]) => args.filter(Boolean).join(' ')

const useSSRLayoutEffect =
  typeof window === 'undefined' ? () => {} : useLayoutEffect

const getUnsplashId = (src: string) => src.split('/')[1]

const getUnsplashImageProps = (src: string) => {
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

const isUnsplashImg = (src: string) => src.startsWith('unsplash/')

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  blurDataUrl?: string
}

const Image: React.FC<ImageProps> = ({
  src,
  blurDataUrl,
  className,
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
            className={classNames('absolute inset-0 w-full h-full', className)}
            key={blurDataUrl}
          />
          <div
            className={classNames(
              'absolute inset-0 w-full h-full backdrop-blur-xl',
              className,
            )}
          />
        </>
      ) : (
        <div
          className={classNames(
            'absolute inset-0 w-full h-full bg-primary-lighter',
            className,
          )}
        />
      )}
      <img
        {...imgProps}
        ref={ref}
        className={classNames(
          'absolute inset-0 w-full h-full transition-opacity',
          !loaded ? 'opacity-0' : false,
          className,
        )}
        {...props}
      />
    </div>
  )
}
export default Image
