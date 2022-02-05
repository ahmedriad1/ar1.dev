import { HeartIcon } from '@heroicons/react/outline'
import Container from './Container'

export default function Footer() {
  return (
    <footer className="py-16 border-t border-gray-200 dark:border-gray-600">
      <Container className="w-full">
        <div className="flex justify-between items-center flex-col md:items-end md:flex-row text-lg">
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
