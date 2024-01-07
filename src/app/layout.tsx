import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '@/layout/HeaderLayout'
import SiteScrollTop from '@/components/SiteScrollTop'
import Script from 'next/script'
import ThemeProvider from './theme-provider'

export const metadata: Metadata = {
  title: 'Blog of djdg626',
  description: '博客,IT,技术,生活,日常分享,教程,前端,JavaScript',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" data-theme="light" style={{ colorScheme: 'light' }}>
      <body>
        <ThemeProvider>
          <div className="relative pt-[5.5rem] flex flex-col min-h-screen text-base-content bg-base-200 transition-colors">
            <SiteHeader />
            <main className="flex-grow px-4 bg-base-100 sm:bg-inherit">{children}</main>

            <Script src="/iconfont.js" strategy="lazyOnload" />
          </div>

          <SiteScrollTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
