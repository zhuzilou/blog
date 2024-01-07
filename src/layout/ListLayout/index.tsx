import { allPosts, Post } from 'contentlayer/generated'
import SitePagination from '@/components/SitePagination'
import dataConfig from 'data'
import PostCard from '@/components/SitePostCard'

interface IListLayoutProps {
  currentPage: number
  posts: Post[]
  isPaginated?: boolean
}

export default function ListLayout({ currentPage, posts, isPaginated = true }: IListLayoutProps) {
  const totalPages = Math.ceil(allPosts.length / dataConfig.totalPageSize)

  return (
    <>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}

      {isPaginated && <SitePagination currentPage={currentPage} totalPages={totalPages} />}
    </>
  )
}
