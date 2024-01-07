//app/page/[page]/page.tsx

import { allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import SiteSlide from '@/components/SiteSlide'
import SiteSidebar from '@/components/SiteSidebar'
import ListLayout from '@/layout/ListLayout'
import dataConfig from 'data'

function getValidateParams() {
  const totalPages = Math.ceil(allPosts.length / dataConfig.totalPageSize)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export const generateStaticParams = async () => {
  return getValidateParams()
}

export default function List({ params }: { params: { page: string } }) {
  const validPages = getValidateParams().map(item => item.page)

  if (!validPages.includes(params.page)) throw notFound()

  return (
    <>
      <div className="mx-auto max-w-5xl py-8 flex">
        <div className="flex-1">
          <SiteSlide />

          <ListLayout currentPage={+params.page} />
        </div>

        <SiteSidebar />
      </div>
    </>
  )
}
