import Button from '~/components/Button'
import Card from '~/components/Card'
import Container from '~/components/Container'
import Image from '~/components/Image'
import { H3 } from '~/components/Typography'

const projects = [
  {
    name: 'Mizmar',
    description:
      'A simple, minimalistic, and modern web application for playing the Holy Quran.',
    link: 'https://mizmar.ar1.dev/',
    image: 'ar1/mizmar-banner',
  },
  {
    name: 'QuranJS',
    description:
      'QuranJS is an organization foucused on building tools in the JS ecosystem, making it easier to build Quarn related prouducts.',
    link: 'https://ar1.dev/blog/introducing-quranjs',
    image: 'ar1/quranjs-banner',
  },
]

export default function Projects() {
  return (
    <Container layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, idx) => (
          <Card key={idx} className="w-full text-white p-0">
            <div className="w-full aspect-[662/372]">
              <Image
                src={project.image}
                alt={`${project.name} Image`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 py-8">
              <div>
                <H3>{project.name}</H3>
                <p className="text-slate-800 dark:text-light mt-3 text-base">
                  {project.description}
                </p>
              </div>
              <Button
                className="mt-5 w-min"
                as="a"
                href={project.link}
                target="_blank"
              >
                Visit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  )
}
