// app/posts/[slug]/page.tsx

import { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dayjs from 'dayjs'
import mdxComponents from '@/layout/MdxLayout'
import SiteComments from '@/components/SiteComments'
import SiteCatalogue from '@/components/SiteCatalogue'
import { getTitles } from '@/lib/getTitles'

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

export type IButtonTypes = 'btn-primary' | 'btn-secondary' | 'btn-accent'

export default async function PostLayout({ params }: { params: { slug: string } }) {
  const post = allPosts.find(post => post.url === params.slug)

  if (!post) notFound()

  const titles = getTitles(post.body.raw)

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className="mx-auto sm:my-5 max-w-5xl py-5 sm:p-5 bg-base-100 rounded-lg">
      <article className="mb-20">
        <div className="text-center">
          <time dateTime={post.date} className="mb-1 text-xs">
            {dayjs(post.date).format('YYYY年MM月DD日')}
          </time>
          {post.tag && (
            <div className="flex justify-center items-center">
              {post.tag.split(',').map((tag, index) => {
                const buttonClass = ('btn-' + ['primary', 'secondary', 'accent'][index % 3]) as IButtonTypes

                return (
                  <Link href={`/tags/${tag}`} className={`mx-1 my-3 btn btn-sm ${buttonClass}`} key={tag} as={'button'}>
                    {tag}
                  </Link>
                )
              })}
            </div>
          )}
          <h1 className="text-4xl font-bold">{post.title}</h1>
        </div>

        <MDXContent components={mdxComponents} />
      </article>

      <SiteComments slug={params.slug} />
    </div>
  )
}
