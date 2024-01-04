'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Icon from '@/components/common/SiteIcon'

const headerNavLinks = [
  { href: '/', title: '首页' },
  { href: '/tags', title: '归档' },
  { href: '/about', title: '关于' },
]

function HeaderLeft() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="mr-3">
          <Image priority className="rounded-full" src="/avatar.jpg" width={48} height={48} alt="头像"></Image>
        </div>
        <div className="hidden text-xl font-medium sm:block">djdg626</div>
      </div>
    </>
  )
}

function HeaderRight(props: { display: Boolean; toggleMenuShow: Function }) {
  return (
    <>
      <nav className="hidden ml-auto text-base font-medium sm:block">
        {headerNavLinks.map(link => (
          <Link key={link.href} className="p-1 dark:text-gray-100 sm:p-4" href={link.href}>
            {link.title}
          </Link>
        ))}
      </nav>

      {props.display && (
        <div className="fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 translate-x-0">
          <div className="h-[5.5rem] px-4 text-white flex justify-end items-center">
            <ToggleMenuShow display={true} toggleMenuShow={() => props.toggleMenuShow()} />
          </div>
          <nav className="flex flex-col items-start px-8 text-2xl font-bold">
            {headerNavLinks.map(link => (
              <Link key={link.href} className="p-4" href={link.href} onClick={() => props.toggleMenuShow(false)}>
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

function ToggleTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDark()
    } else {
      removeDark()
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      removeDark()
    } else {
      setDark()
    }
  }

  const setDark = () => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
    setTheme('dark')
  }

  const removeDark = () => {
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
    setTheme('light')
  }

  return (
    <>
      <button
        className="ml-auto sm:ml-1 p-1 rounded-md w-8 h-8 flex justify-center items-center"
        onClick={() => toggleTheme()}
      >
        <span className="sr-only">Toggle mode</span>
        {theme !== 'dark' ? (
          <Icon name="light" className={`w-4 h-4`}></Icon>
        ) : (
          <Icon name="dark" className={`w-4 h-4`}></Icon>
        )}
      </button>
    </>
  )
}

function ToggleMenuShow(props: { display: Boolean; toggleMenuShow: Function }) {
  const toggleMenuShow = () => {
    props.toggleMenuShow()
  }

  return (
    <>
      <button
        className="sm:hidden ml-1 sm:ml-4 p-1 rounded-md w-8 h-8 flex justify-center items-center text-slate-900 dark:text-slate-100"
        onClick={() => toggleMenuShow()}
      >
        <span className="sr-only">Toggle Menu Show</span>
        {!props.display ? (
          <Icon name="menu" className={`w-4 h-4`}></Icon>
        ) : (
          <Icon name="close" className={`w-4 h-4`}></Icon>
        )}
      </button>
    </>
  )
}

export default function Header() {
  const [display, setDisplay] = useState(false)

  const toggleMenuShow = (display: Boolean) => {
    if (display) {
      document.documentElement.classList.add('overflow-hidden')
      setDisplay(true)
    } else {
      document.documentElement.classList.remove('overflow-hidden')
      setDisplay(false)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex mx-auto max-w-5xl h-[5.5rem] bg-inherit">
        <div className="px-4 flex-1 flex justify-between items-center">
          <HeaderLeft />
          <HeaderRight display={display} toggleMenuShow={() => toggleMenuShow(false)} />
          <ToggleTheme />
          <ToggleMenuShow display={false} toggleMenuShow={() => toggleMenuShow(true)} />
        </div>
      </header>
    </>
  )
}
