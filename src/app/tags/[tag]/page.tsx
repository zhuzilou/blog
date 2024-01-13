import { allPosts } from 'contentlayer/generated'
import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import ListLayout from '@/layout/ListLayout'
import { computeTags } from '@/lib/computeTags'

function getTags() {
  const tagsAndCounts = computeTags()

  return Object.keys(tagsAndCounts).map(tag => ({
    tag: tag,
  }))
}

export const generateStaticParams = async () => {
  return getTags()
}

export default function Tag({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const tags = getTags().map(item => item.tag)

  if (!tags.includes(tag)) throw notFound()

  const posts = allPosts
    .filter(post => {
      const tags = post.tag ? post.tag.split(',') : ['默认']
      return tags.includes(tag)
    })
    .sort((a, b) => (dayjs(a.date).isBefore(b.date) ? 1 : -1))

  return (
    <>
      <div className="my-8 mx-auto max-w-5xl">
        <h2 className="py-8 mb-8 text-xl font-bold text-center bg-base-100 rounded-lg">#{tag}</h2>

        <ListLayout currentPage={1} posts={posts} isPaginated={false} />
      </div>
    </>
  )
}
