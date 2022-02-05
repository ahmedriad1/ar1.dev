import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export default function MdxViewer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={clsx(
        'prose lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-a:text-accent hover:prose-a:text-primary-lighter prose-a:no-underline hover:prose-a:underline hover:prose-a:underline-offset-1 prose-pre:!py-8 prose-img:!my-0 mx-auto',
        className,
      )}
      {...props}
    >
      {/* <MDXRemote
        {...children}
        components={{
          img: props => (
            <div className='aspect-[2/1]'>
              <Image
                {...props}
                className='object-cover w-full h-full rounded-lg'
                alt='Image'
              />
            </div>
          ),
        }}
      /> */}
    </article>
  )
}
