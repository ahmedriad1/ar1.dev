import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-slate-500/20 dark:bg-primary-light rounded overflow-hidden shadow',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
