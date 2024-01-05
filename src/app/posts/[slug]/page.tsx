// app/posts/[slug]/page.tsx

import dayjs from 'dayjs'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import mdxComponents from '@/components/common/MdxComponents'

export async function generateStaticParams() {
  return allPosts.map(post => ({
    slug: post.url,
  }))
}

export default async function PostLayout({ params }: { params: { slug: string } }) {
  const post = allPosts.find(post => post.url === params.slug)

  if (!post) notFound()

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <article className="mx-auto max-w-5xl py-5 sm:p-5">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {dayjs(post.date).format('YYYY年MM月DD日')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <MDXContent components={mdxComponents} />
    </article>
  )
}
