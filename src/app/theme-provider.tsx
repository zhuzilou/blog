'use client'

import { ThemeProvider as Themes } from 'next-themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Themes attribute="data-theme" defaultTheme="light">
      {children}
    </Themes>
  )
}
