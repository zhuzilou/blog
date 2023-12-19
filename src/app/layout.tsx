import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blog of djdg626',
  description: 'djdg626博客,IT,技术,生活,日常分享,教程,前端,JavaScript',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
