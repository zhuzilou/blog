'use client'

import { useEffect, useState } from 'react'
import Icon from '@/components/SiteIcon'
import { useSwitchTheme } from '@/lib/switchTheme'

function ToggleTheme() {
  const [mounted, setMounted] = useState(true)
  const { theme, switchTheme } = useSwitchTheme()

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
        onClick={() => switchTheme()}
      >
        {mounted && theme === 'night' ? (
          <Icon name="light" className={`w-4 h-4`}></Icon>
        ) : (
          <Icon name="dark" className={`w-4 h-4`}></Icon>
        )}
      </button>
    </>
  )
}

export default ToggleTheme
