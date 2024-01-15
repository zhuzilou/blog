'use client'

import { usePathname, useRouter } from 'next/navigation'
import Icon from '@/components/SiteIcon'

const navConfig = [
  {
    label: '归档',
    url: 'posts',
    icon: 'folder',
    active: 0,
  },
  {
    label: '标签',
    url: 'tags',
    icon: 'tag',
    active: 1,
  },
]

export default function SiteArchiveNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  const active = pathname === '/archives/tags' ? 1 : pathname === '/archives/posts' ? 0 : -1

  return (
    <div className="flex justify-between border-b-2 border-secondary pb-4">
      <h1 className="text-3xl font-bold">{active === 0 ? '全部文章' : '全部标签'}</h1>
      <div className="flex space-x-4">
        {navConfig.map(item => (
          <button
            key={item.active}
            className={`btn btn-sm ${active === item.active && 'btn-info text-info-content'}`}
            onClick={() => router.push(`/archives/${item.url}`)}
          >
            <Icon name={item.icon} className="w-4 h-4"></Icon>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
