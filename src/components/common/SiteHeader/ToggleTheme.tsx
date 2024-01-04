'use client'

import { useEffect, useState } from 'react'

import Icon from '@/components/common/SiteIcon'

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

export default ToggleTheme
