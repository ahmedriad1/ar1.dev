import { HeartIcon } from '@heroicons/react/outline'
import { MailIcon } from '@heroicons/react/solid'
import Container from './Container'
import { GithubIcon, TwitterIcon } from './Icons'
import type { IconProps } from './Icons'

interface SocialLinksProps {
  href: string
  icon: React.ElementType<IconProps>
}

const SocialLink = ({ href, icon: Icon }: SocialLinksProps) => (
  <a
    href={href}
    target="_blank"
    className="text-gray-500 hover:text-black dark:text-primary-lighter dark:hover:text-white transition-colors"
  >
    {<Icon className="w-8 h-8" />}
  </a>
)

export default function Footer() {
  return (
    <footer className="py-16 border-t border-gray-200 dark:border-gray-600">
      <Container className="w-full">
        <div className="flex items-center justify-center md:justify-start text-lg space-x-4">
          <SocialLink href="/gh" icon={GithubIcon} />
          <SocialLink href="/twitter" icon={TwitterIcon} />
          <SocialLink href="mailto:ahmed@ar1.dev" icon={MailIcon} />
        </div>
        <div className="flex justify-between items-center flex-col md:items-end md:flex-row text-lg mt-8">
          <p className="flex items-center">
            Made with <HeartIcon className="w-7 h-7 text-accent mx-2" /> by
            Ahmed
          </p>
          <div className="text-gray-500 dark:text-primary-lighter mt-10 md:mt-0">
            <span>All rights reserved</span>{' '}
            <span>{`© Ahmed Riad ${new Date().getFullYear()}`}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
