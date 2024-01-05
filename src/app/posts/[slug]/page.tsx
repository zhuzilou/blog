// app/posts/[slug]/page.tsx

import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import mdxComponents from '@/components/common/MdxComponents'
import SiteComments from '@/components/common/SiteComments'
import dayjs from 'dayjs'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = allPosts.find(post => post.url === params.slug)

  return {
    title: post?.title || '404',
  }
}

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
    <div className="mx-auto max-w-5xl py-5 sm:p-5">
      <article className="mb-20">
        <div className="mb-8 text-center">
          <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
            {dayjs(post.date).format('YYYY年MM月DD日')}
          </time>
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        <MDXContent components={mdxComponents} />
      </article>

      <SiteComments slug={params.slug} />
    </div>
  )
}
