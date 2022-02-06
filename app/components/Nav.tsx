import clsx from 'clsx'
import { Link, useResolvedPath, useLocation } from 'remix'
import Container from './Container'
import React, { useState } from 'react'
import { Theme, useTheme } from '~/utils/theme-provider'
import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/outline'
import { useSSRLayoutEffect } from '~/utils/other'
import { Disclosure } from '@headlessui/react'

interface NavLinkProps {
  to: string
  exact?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, exact = false }) => {
  const resolved = useResolvedPath(to).pathname
  const location = useLocation()
  const active = exact
    ? location.pathname === resolved
    : location.pathname.startsWith(resolved)

  return (
    <li>
      <Link
        to={to}
        className={clsx('text-sm md:text-base', {
          'text-black dark:text-white font-semibold': active,
          'text-gray-700 dark:text-primary-lighter': !active,
        })}
      >
        {children}
      </Link>
    </li>
  )
}

const navigation = [
  {
    title: 'Home',
    to: '/',
    exact: true,
  },
  {
    title: 'Projects',
    to: '/projects',
  },
  {
    title: 'Blog',
    to: '/blog',
  },
]

export default function Nav() {
  const [theme, setTheme] = useTheme()
  const [scrolled, setScrolled] = useState<boolean>()

  useSSRLayoutEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Disclosure
      as="nav"
      className={({ open }) => {
        return clsx(
          'py-8 h-auto flex flex-col justify-center fixed top-0 left-0 w-full z-50 transition-colors border-b border-transparent',
          (scrolled || open) &&
            'bg-white/75 dark:bg-[#1e2030]/75 backdrop-blur border-gray-300 dark:border-gray-600',
        )
      }}
    >
      {({ open }) => (
        <>
          <Container className="w-full flex justify-between items-center">
            <Link to="/" className="text-accent text-2xl md:text-3xl font-bold">
              Ahmed
            </Link>

            <div className="flex space-x-8 items-center">
              <ul className="hidden sm:flex space-x-8 items-center">
                {navigation.map(({ title, to, exact = false }) => (
                  <NavLink key={to} to={to} exact={exact}>
                    {title}
                  </NavLink>
                ))}
              </ul>

              <button
                onClick={() =>
                  setTheme(t => (t === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))
                }
              >
                {theme === Theme.LIGHT ? (
                  <MoonIcon className="w-7 h-7" />
                ) : (
                  <SunIcon className="w-7 h-7" />
                )}
              </button>

              <Disclosure.Button className="block sm:hidden">
                {open ? (
                  <XIcon className="w-7 h-7" />
                ) : (
                  <MenuIcon className="w-7 h-7" />
                )}
              </Disclosure.Button>
            </div>
          </Container>
          {open ? (
            <Container className="w-full mt-8">
              <ul className="space-y-8">
                {navigation.map(({ title, to, exact = false }) => (
                  <NavLink key={to} to={to} exact={exact}>
                    {title}
                  </NavLink>
                ))}
              </ul>
            </Container>
          ) : null}
        </>
      )}
    </Disclosure>
  )
}
