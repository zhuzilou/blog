'use client'

import { useEffect, useState } from 'react'
import Icon from '@/components/SiteIcon'
import { useThemeStore } from 'stores/theme-store'
import { shallow } from 'zustand/shallow'
import dataConfig from 'data'

function ToggleTheme() {
  const [mounted, setMounted] = useState(true)
  const { isDark, toggleDark } = useThemeStore(
    state => ({
      isDark: state.isDark,
      toggleDark: state.toggleDark,
    }),
    shallow
  )

  useEffect(() => {
    const initialTheme = window.localStorage.getItem('data-theme') || dataConfig.defaultTheme

    const theme = initialTheme !== dataConfig.themeLight ? dataConfig.themeDark : dataConfig.themeLight

    localStorage.setItem('data-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)

    if (initialTheme !== dataConfig.themeLight) {
      toggleDark()
    }

    // When mounted on client, now we can show the UI
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) {
    return null
  }

  const switchTheme = () => {
    const theme = isDark ? dataConfig.themeLight : dataConfig.themeDark
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
