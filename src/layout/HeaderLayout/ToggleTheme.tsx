'use client'

import { useEffect, useState } from 'react'
import Icon from '@/components/SiteIcon'
import { useThemeStore } from 'stores/theme-store'
import { shallow } from 'zustand/shallow'

function ToggleTheme() {
  const [mounted, setMounted] = useState(true)
  const { isDark, toggleDark } = useThemeStore(
    state => ({
      isDark: state.isDark,
      toggleDark: state.toggleDark,
    }),
    shallow
  )

  // When mounted on client, now we can show the UI
  useEffect(() => {
    const initialTheme = window.localStorage.getItem('data-theme') || 'light'

    const theme = initialTheme !== 'light' ? 'night' : 'light'

    localStorage.setItem('data-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)

    if (initialTheme !== 'light') {
      console.log('callback toggleDark')

      toggleDark()
    }

    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) {
    return null
  }

  const switchTheme = () => {
    const theme = isDark ? 'light' : 'night'
    toggleDark()
    localStorage.setItem('data-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        className="ml-auto sm:ml-1 p-1 rounded-md w-8 h-8 flex justify-center items-center"
        onClick={() => switchTheme()}
      >
        {mounted && isDark ? (
          <Icon name="light" className={`w-4 h-4`}></Icon>
        ) : (
          <Icon name="dark" className={`w-4 h-4`}></Icon>
        )}
      </button>
    </>
  )
}

export default ToggleTheme
