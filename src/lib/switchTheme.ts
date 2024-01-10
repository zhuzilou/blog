import { useEffect, useState } from 'react'

type Theme = 'light' | 'night'

export function useSwitchTheme() {
  'use client'

  const initialTheme = window.localStorage.getItem('data-theme')
  let [theme, setTheme] = useState<Theme>((initialTheme || 'light') as Theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const switchTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'night' : 'light'

    setTheme(newTheme)
    localStorage.setItem('data-theme', newTheme)
  }

  return { theme, switchTheme }
}
