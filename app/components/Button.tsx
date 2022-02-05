import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

const Button: React.FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { secondary?: boolean }
> = ({ className, children, secondary = false, ...props }) => {
  return (
    <button
      className={clsx(
        'flex items-center px-6 py-3 text-sm sm:text-base rounded-full relative overflow-hidden group transition-colors ease-in-out isolate shadow-sm outline-none ring-2 ring-transparent focus:ring-white text-white',
        {
          'hover:text-gray-100': secondary,
          'hover:text-gray-200': !secondary,
        },
        className,
      )}
      {...props}
    >
      <div
        className={clsx(
          'absolute w-full h-full scale-125 top-0 left-0 pointer-events-none z-[-1] transition-opacity duration-150[transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)]',
          {
            'bg-slate-200 dark:bg-white opacity-20 group-hover:opacity-40 group-active:opacity-50':
              secondary,
            'bg-accent opacity-80 group-hover:opacity-60 group-active:opacity-50':
              !secondary,
          },
        )}
      />
      {children}
    </button>
  )
}

export default Button
