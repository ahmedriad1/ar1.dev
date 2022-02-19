import { ChevronRightIcon } from '@heroicons/react/outline'
import { Link } from 'remix'
import Button from '~/components/Button'
import Container from '~/components/Container'
import { Overlay } from '~/components/Overlay'
import Spacer from '~/components/Spacer'
import { H3 } from '~/components/Typography'

// const a = getMiniflareBindings();

export default function Home() {
  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center relative overflow-hidden isolate">
        <Overlay
          className="bg-blend-darken hidden dark:block"
          style={{
            backgroundImage: `
          radial-gradient(at top left, rgb(41, 44, 65), transparent),
          radial-gradient(at top right, rgb(96, 165, 250), transparent),
          radial-gradient(at bottom left, rgb(168, 85, 247), transparent)
        `,
          }}
        />
        <Overlay
          className="bg-blend-luminosity dark:hidden"
          style={{
            backgroundImage: `
          radial-gradient(at top left, rgb(228 86 145), transparent),
          radial-gradient(at top right, rgb(168, 85, 247), transparent),
          radial-gradient(at bottom left, #B3588A, transparent)
        `,
          }}
        />
        <Container className="w-full">
          <Spacer size="2xs" />
          <H3 className="font-semibold">Hey there</H3>

          <h1 className="mt-3 text-accent text-6xl md:text-9xl font-bold">
            I'm Ahmed
          </h1>

          <div className="mt-12 flex space-x-4">
            <Button as={Link} to="/projects">
              See my work
              <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button secondary as={Link} to="/blog">
              My latest posts
              <ChevronRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Container>
      </section>
      {/* <section className='py-12'>
        <Container className='w-full'>
          <H1>About me</H1>
        </Container>
      </section> */}
    </>
  )
}
