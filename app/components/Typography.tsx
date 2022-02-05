import { createElement } from 'react'
import clsx from 'clsx'

type TitleProps = {
  as?: React.ElementType
  className?: string
  id?: string
} & (
  | { children: React.ReactNode }
  | {
      dangerouslySetInnerHTML: {
        __html: string
      }
    }
  | React.HTMLAttributes<HTMLHeadingElement>
)

const fontSize = {
  h1: 'leading-tight text-4xl md:text-5xl',
  h2: 'leading-tight text-3xl md:text-4xl',
  h3: 'text-2xl font-medium md:text-3xl',
  h4: 'text-xl font-medium md:text-2xl',
  h5: 'text-lg font-medium md:text-xl',
  h6: 'text-lg font-medium',
}

function Title({
  size,
  as,
  className,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size
  return (
    <Tag
      className={clsx(fontSize[size], 'text-black dark:text-white', className)}
      {...rest}
    />
  )
}

export function H1(props: TitleProps) {
  return <Title {...props} size="h1" />
}

export function H2(props: TitleProps) {
  return <Title {...props} size="h2" />
}

export function H3(props: TitleProps) {
  return <Title {...props} size="h3" />
}

export function H4(props: TitleProps) {
  return <Title {...props} size="h4" />
}

export function H5(props: TitleProps) {
  return <Title {...props} size="h5" />
}

export function H6(props: TitleProps) {
  return <Title {...props} size="h6" />
}

type ParagraphProps = {
  className?: string
  prose?: boolean
  textColorClassName?: string
  as?: React.ElementType
} & (
  | { children: React.ReactNode }
  | { dangerouslySetInnerHTML: { __html: string } }
)

export function Paragraph({
  className,
  prose = true,
  as = 'p',
  ...rest
}: ParagraphProps) {
  return createElement(as, {
    className: clsx('max-w-full text-base', className, {
      'prose dark:prose-invert': prose,
    }),
    ...rest,
  })
}
