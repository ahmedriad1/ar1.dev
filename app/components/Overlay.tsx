import clsx from 'clsx'

export const Overlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(
      'absolute top-0 left-0 w-full h-full pointer-events-none z-[-999999] blur-3xl scale-125 bg-no-repeat',
      className,
    )}
    {...props}
  />
)

export const ErrorOverlay = () => (
  <Overlay className="bg-blend-darken hidden dark:block [background-image:radial-gradient(at_top_left,#B3588A,transparent),radial-gradient(at_top_right,rgb(96,165,250),transparent),radial-gradient(at_bottom_left,rgb(168,85,247),transparent)]" />
)
