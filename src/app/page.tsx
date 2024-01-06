// app/page.tsx
import Link from 'next/link'
import { allPosts, Post } from 'contentlayer/generated'
import dayjs from 'dayjs'
import SiteSidebar from '@/components/SiteSidebar'

function PostCard(post: Post) {
  const tags = post.tag ? post.tag.split(',') : ['默认']

  return (
    <div className="mt-8 px-2 sm:px-4 py-6 mx-auto rounded-lg bg-base-100 group">
      <div className="flex justify-between items-center">
        <time dateTime={post.date} className="text-xs">
          {dayjs(post.date).format('YYYY年MM月DD日')}
        </time>
        <div className="flex">
          {tags.map(tag => (
            <Link key={tag} href={`/tags/${tag}`}>
              <span className="text-xs font-medium mx-2 text-secondary pointer-events-auto">#{tag}</span>
            </Link>
          ))}
        </div>
      </div>
      <Link prefetch href={`/posts/${post.url}`}>
        <div className="mt-3">
          <h2 className="text-xl font-bold">{post.title}</h2>

          <p className="mt-2 text-default">{post.description || '暂无描述'}</p>
        </div>
      </Link>
    </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => (dayjs(a.date).isBefore(b.date) ? 1 : -1))

  return (
    <div className="mx-auto max-w-5xl py-8 flex">
      <div className="flex-1">
        <div className="bg-base-100 h-48 sm:h-64 rounded-lg"></div>

        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>

      <SiteSidebar />
    </div>
  )
}
