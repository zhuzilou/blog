import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Blog of djdg626',
  description: '博客,IT,技术,生活,日常分享,教程,前端,JavaScript',
}

const ThemeProviders = dynamic(() => import('@/components/theme-providers'), { ssr: false })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProviders>
          <div className="relative pt-[5.5rem] flex flex-col min-h-screen text-base-content bg-base-200 transition-colors">
            <SiteHeader />
            <main className="flex-grow px-4 bg-base-100 sm:bg-inherit">{children}</main>

            <script src="/iconfont.js" async></script>
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}
