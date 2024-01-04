import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '@/components/common/SiteHeader'

export const metadata: Metadata = {
  title: 'Blog of djdg626',
  description: '博客,IT,技术,生活,日常分享,教程,前端,JavaScript',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="relative pt-[5.5rem] flex flex-col min-h-screen text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-950">
          <SiteHeader />
          <main className="flex-grow">{children}</main>

          <script src="/iconfont.js" async></script>
        </div>
      </body>
    </html>
  )
}
