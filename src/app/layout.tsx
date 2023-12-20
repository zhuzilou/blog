import type { Metadata } from 'next'
import './globals.css'
import SiteHeader from '@/components/common/SiteHeader'
import SiteFooter from '@/components/common/SiteFooter'

export const metadata: Metadata = {
  title: 'Blog of djdg626',
  description: '博客,IT,技术,生活,日常分享,教程,前端,JavaScript',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="relative pt-12 flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-grow">{children}</main>
          {/* <SiteFooter /> */}

          <script src="/iconfont.js" async></script>
        </div>
      </body>
    </html>
  )
}
