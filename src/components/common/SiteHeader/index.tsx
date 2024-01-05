'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import ToggleTheme from './ToggleTheme'
import ToggleMenuShow from './ToggleMenuShow'

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
      <header className="fixed top-0 left-0 right-0 flex h-[5.5rem] bg-inherit z-[99]">
        <div className="px-4 sm:px-0 mx-auto max-w-5xl flex-1 flex justify-between items-center">
          <HeaderLeft />
          <HeaderRight display={display} toggleMenuShow={() => toggleMenuShow(false)} />
          <ToggleTheme />
          <ToggleMenuShow display={false} toggleMenuShow={() => toggleMenuShow(true)} />
        </div>
      </header>
    </>
  )
}
