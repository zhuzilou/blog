// app/page.tsx
import Link from 'next/link'
import { allPosts, Post } from 'contentlayer/generated'
import dayjs from 'dayjs'

function PostCard(post: Post) {
  return (
    <Link href={post.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
      <div className="mb-8 py-6 px-2 mx-auto rounded-lg cursor-pointer sm:hover:bg-[#f9fafb]">
        <h2 className="mb-1 text-xl">{post.title}</h2>
        <time dateTime={post.date} className="mb-2 block text-xs text-gray-600 dark:text-gray-300">
          {dayjs(post.date).format('YYYY年MM月DD日')}
        </time>
        <p className="text-gray-600 dark:text-gray-300">{post.description || '暂无描述'}</p>
      </div>
    </Link>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => (dayjs(a.date).isBefore(b.date) ? 1 : -1))

  return (
    <div className="mx-auto max-w-5xl py-8">
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}
