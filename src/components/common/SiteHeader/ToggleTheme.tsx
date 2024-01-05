'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import Icon from '@/components/common/SiteIcon'

function ToggleTheme() {
  const [mounted, setMounted] = useState(true)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        className="ml-auto sm:ml-1 p-1 rounded-md w-8 h-8 flex justify-center items-center"
        onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        <span className="sr-only">Toggle mode</span>
        {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
          <Icon name="light" className={`w-4 h-4`}></Icon>
        ) : (
          <Icon name="dark" className={`w-4 h-4`}></Icon>
        )}
      </button>
    </>
  )
}

export default ToggleTheme
