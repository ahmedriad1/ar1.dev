import { Link } from 'remix'
import Button from './Button'
import { H1, Paragraph } from './Typography'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { ErrorOverlay } from './Overlay'
import { RedBox } from './Error'

export default function ErrorPage({
  error,
  msg,
  subMsg,
}: {
  error?: Error
  msg: string
  subMsg?: string
}) {
  return (
    <div className="relative w-full h-screen text-center flex justify-center items-center flex-col overflow-hidden">
      {error && process.env.NODE_ENV === 'development' ? (
        <RedBox error={error} />
      ) : null}
      <ErrorOverlay />

      <H1 className="font-bold">{msg}</H1>
      {subMsg ? <Paragraph className="mt-10">{subMsg}</Paragraph> : null}
      <Link to="/">
        <Button className="mt-10">
          <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Go home
        </Button>
      </Link>
    </div>
  )
}
