import clsx from 'clsx'
import React from 'react'
import { Props } from '~/types'
import { forwardRefWithAs } from '~/utils/other'

interface ButtonProps {
  secondary?: boolean
}

let DEFAULT_BUTTON_TAG = 'button' as const

const Button = forwardRefWithAs(
  <TTag extends React.ElementType = typeof DEFAULT_BUTTON_TAG>(
    {
      className,
      children,
      secondary = false,
      as: Component,
      ...props
    }: Props<TTag> & ButtonProps,
    ref: React.Ref<TTag>,
  ) => {
    const El = Component ?? DEFAULT_BUTTON_TAG

    return (
      <El
        className={clsx(
          'flex items-center px-6 py-3 text-sm sm:text-base rounded-full relative overflow-hidden group transition-colors ease-in-out isolate shadow-sm outline-none ring-2 ring-transparent focus-visible:ring-white text-white',
          {
            'hover:text-gray-100': secondary,
            'hover:text-gray-200': !secondary,
          },
          className,
        )}
        {...props}
        ref={ref as any}
      >
        <div
          className={clsx(
            'absolute w-full h-full scale-125 top-0 left-0 pointer-events-none z-[-1] transition-opacity duration-150 ease-out-expo',
            {
              'bg-slate-200 dark:bg-white opacity-20 group-hover:opacity-40 group-active:opacity-50':
                secondary,
              'bg-accent opacity-80 group-hover:opacity-60 group-active:opacity-50':
                !secondary,
            },
          )}
        />
        {children}
      </El>
    )
  },
)

export default Button
