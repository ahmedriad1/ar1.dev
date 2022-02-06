import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  layout?: boolean
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  layout = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10',
        layout && 'pt-28 py-12 w-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
