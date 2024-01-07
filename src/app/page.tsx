// app/page.tsx
import SiteSlide from '@/components/SiteSlide'
import SiteSidebar from '@/components/SiteSidebar'
import ListLayout from '@/layout/ListLayout'

export default function List() {
  return (
    <div className="mx-auto max-w-5xl py-8 flex">
      <div className="flex-1">
        <SiteSlide />

        <ListLayout currentPage={1} />
      </div>

      <SiteSidebar />
    </div>
  )
}
