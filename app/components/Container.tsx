import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

const Container: React.FC<
  HTMLAttributes<HTMLDivElement> & { layout?: boolean }
> = ({ children, className, layout = false, ...props }) => {
  return (
    <div
      className={clsx(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10',
        className,
        {
          'pt-28 py-12 w-full': layout,
        },
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
