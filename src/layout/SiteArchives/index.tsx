/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { groupBy, throttle } from 'lodash'
import Link from 'next/link'
import { getYear } from '@/lib/getYear'
import Icon from '../../components/SiteIcon'
import { allPosts as _allPosts } from 'contentlayer/generated'

function SiteTimeLine({ currentYear, years }: { currentYear: number; years: number[] }) {
  return (
    <div className="relative w-1/4 pr-4 flex flex-col">
      <div className="sticky top-32">
        <h3 className="flex items-center text-xl sm:text-2xl font-bold">
          <Icon name="timeline" className="hidden sm:block w-6 h-6"></Icon>
          <span className="sm:ml-2">时间线</span>
        </h3>
        <ul className="flex-1 mt-6 sticky top-28 space-y-4 overflow-auto">
          {years.map(year => {
            const className = year === currentYear ? `text-secondary font-bold` : `dark:text-gray-300`

            return (
              <li key={year} className={`${className} transition-all`}>
                {year}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function PostsList({ setCurrentYear, allPostsGroupByYear }: { setCurrentYear: Function; allPostsGroupByYear: any }) {
  const handleScroll = useCallback(
    throttle(() => {
      const postElements = (postListRef.current as any).querySelectorAll('.post-list') // Add a class to your post items

      postElements.forEach((postElement: any) => {
        const rect = postElement.getBoundingClientRect()

        if (rect.top < 150) {
          // The post is 150px from the top.
          const currentYear = parseInt(postElement.getAttribute('data-year') as string)
          setCurrentYear(currentYear)
        }
      })
    }, 300),
    []
  )

  const postListRef = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // Add an empty dependency array to ensure the effect runs only once

  return (
    <div ref={postListRef} className="w-3/4 overflow-auto">
      <div className="space-y-6">
        {Object.keys(allPostsGroupByYear)
          .sort((a, b) => +b - +a)
          .map(year => (
            <div className="post-list" key={year} data-year={year}>
              <h3 className="flex items-center text-xl mb-4 pl-2">
                <Icon name="calendar" className="w-6 h-6"></Icon>
                <span className="ml-2 text-secondary font-bold">{year}</span>
              </h3>
              {allPostsGroupByYear[year]
                .sort((a: any, b: any) => b.date - a.date)
                .map((item: any, index: any) => (
                  <div key={index} className="overflow-hidden">
                    <Link prefetch href={`/posts/${item.url}`}>
                      <h2
                        className={`inline-block max-w-full py-2 px-2 font-bold truncate hover:bg-secondary hover:text-secondary-content rounded-md`}
                      >
                        {item.title}
                      </h2>
                    </Link>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default function SiteArchives({ tag }: { tag?: string }) {
  const posts = _allPosts
    .filter(post => {
      if (!tag) return true
      const tags = post.tag ? post.tag.split(',') : ['默认']
      return tags.includes(tag)
    })
    .map(item => ({
      title: item.title,
      year: getYear(item.date),
      url: item.url,
      date: new Date(item.date).getTime(),
    }))
    .sort((a, b) => b.year - a.year)

  const allPostsGroupByYear = groupBy(posts, 'year')

  const years = Array.from(new Set(posts.map(item => item.year))).sort((a, b) => b - a)

  const [currentYear, setCurrentYear] = useState(years[0])

  return (
    <div className="relative flex mt-8">
      <SiteTimeLine currentYear={currentYear} years={years} />

      <PostsList setCurrentYear={setCurrentYear} allPostsGroupByYear={allPostsGroupByYear} />
    </div>
  )
}
