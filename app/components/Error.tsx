import { Link, useMatches } from 'remix'
import { useState } from 'react'
import errorStack from 'error-stack-parser'
import clsx from 'clsx'
import { H1, H2, H6, Paragraph } from './Typography'
import Button from './Button'
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { ErrorOverlay } from './Overlay'

interface RedBoxProps {
  error: Error
}

export const RedBox = ({ error }: RedBoxProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const frames = errorStack.parse(error)

  return (
    <div
      className={clsx(
        'fixed z-[99999999] inset-0 flex items-center justify-center transition',
        !isVisible && 'opacity-0 pointer-events-none',
      )}
    >
      <button
        className="absolute inset-0 block w-full h-full bg-black opacity-75"
        onClick={() => setIsVisible(false)}
      />
      <div className="border-lg text-primary relative mx-5vw my-16 p-12 max-h-[75vh] bg-red-500 rounded-lg overflow-y-auto">
        <H2>{error.message}</H2>
        <div>
          {frames.map(frame => (
            <div
              key={[frame.fileName, frame.lineNumber, frame.columnNumber].join(
                '-',
              )}
              className="pt-4"
            >
              <H6 as="div" className="pt-2">
                {frame.functionName}
              </H6>
              <div className="font-mono opacity-75">
                {frame.fileName}:{frame.lineNumber}:{frame.columnNumber}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ErrorPageProps {
  error?: Error
  heroProps: {
    title: string
    subtitle: string
  }
}

export const ErrorPage = ({ error, heroProps }: ErrorPageProps) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center w-full h-screen text-center relative pt-12 overflow-hidden">
      <ErrorOverlay />
      {error && process.env.NODE_ENV === 'development' ? (
        <RedBox error={error} />
      ) : null}
      <H1 className="font-bold">{heroProps.title}</H1>
      <Paragraph className="mt-10">{heroProps.subtitle}</Paragraph>
      <Link to="/">
        <Button className="mt-10">
          <ArrowNarrowLeftIcon className="inline w-5 h-5 mr-2 align-middle" />
          Go home
        </Button>
      </Link>
    </div>
  )
}

export const FourOhFour = () => {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      heroProps={{
        title: "404 Looks like you're lost",
        subtitle: `Sorry, "${pathname}" is not a valid page`,
      }}
    />
  )
}

interface ServerErrorProps {
  error?: Error
}

export const ServerError = ({ error }: ServerErrorProps) => {
  const matches = useMatches()
  const last = matches[matches.length - 1]
  const pathname = last?.pathname

  return (
    <ErrorPage
      error={error}
      heroProps={{
        title: '500 Something did not go well.',
        subtitle: `"${pathname}" is currently not working. So sorry.`,
      }}
    />
  )
}
