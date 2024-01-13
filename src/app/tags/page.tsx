import { computeTags } from '@/lib/computeTags'
import Link from 'next/link'

export default function SiteTags() {
  const tagsAndCounts = computeTags()

  const tags = Object.keys(tagsAndCounts).sort((a, b) => tagsAndCounts[b] - tagsAndCounts[a])

  return (
    <div className="my-8 mx-auto max-w-5xl py-8 bg-base-100 rounded-lg">
      <h2 className="text-xl font-bold text-center">标签</h2>
      <div className="mt-8 flex justify-center">
        {tags.map(tag => {
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-3 inline-block text-sm font-semibold hover:text-secondary"
            >
              #{tag}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
