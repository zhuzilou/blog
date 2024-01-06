// app/page.tsx
import Link from 'next/link'
import { allPosts, Post } from 'contentlayer/generated'
import dayjs from 'dayjs'

function PostCard(post: Post) {
  return (
    <div className="mt-8 px-2 sm:px-4 py-6 mx-auto rounded-lg cursor-pointer bg-base-100 group">
      <Link href={`/posts/${post.url}`}>
        <div className="flex justify-between items-center">
          <time dateTime={post.date} className="text-xs text-secondary">
            {dayjs(post.date).format('YYYY年MM月DD日')}
          </time>
          <div className="flex">
            <span className="text-xs font-medium mx-2 text-secondary hover:text-heading pointer-events-auto">#Web</span>
          </div>
        </div>

        <div className="mt-3">
          <h2 className="text-xl font-bold text-heading group-hover:text-primary">{post.title}</h2>

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
        <div className="bg-base-100 min-h-40"></div>

        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>

      <div className="hidden sm:block ml-10 w-72 bg-base-100">
        <h2 className="text-3xl text-red-700 min-h-screen">Hello World</h2>
      </div>
    </div>
  )
}
