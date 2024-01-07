import { Post } from 'contentlayer/generated'
import dayjs from 'dayjs'
import Link from 'next/link'

export default function PostCard(post: Post) {
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
