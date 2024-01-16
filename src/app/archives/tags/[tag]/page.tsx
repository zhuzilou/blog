import { allPosts as _allPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { computeTags } from '@/lib/computeTags'
import SiteArchives from '@/layout/SiteArchives'

function getTags() {
  const tagsAndCounts = computeTags()

  return Object.keys(tagsAndCounts).map(tag => ({
    tag: tag,
  }))
}

export default function SitePostsByTag({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const tags = getTags().map(item => item.tag)

  if (!tags.includes(tag)) throw notFound()

  return <SiteArchives tag={tag} />
}
