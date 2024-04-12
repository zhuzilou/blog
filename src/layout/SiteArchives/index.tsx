/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { groupBy, throttle } from 'lodash'
import Link from 'next/link'
import { getYear, getYearMonth, sortYearMonth } from '@/lib/getYearMonth'
import Icon from '../../components/SiteIcon'
import { allPosts as _allPosts } from 'contentlayer/generated'

function SiteTimeLine({ currentYearMonth, yearMonths }: { currentYearMonth: string; yearMonths: string[] }) {
  return (
    <div className="relative w-1/4 pr-4 flex flex-col">
      <div className="sticky top-32">
        <h3 className="flex items-center text-xl sm:text-2xl font-bold">
          <Icon name="timeline" className="hidden sm:block w-6 h-6"></Icon>
          <span className="sm:ml-2">时间线</span>
        </h3>
        <ul className="flex-1 mt-6 sticky top-28 space-y-4 overflow-auto">
          {yearMonths.map(yearMonth => {
            const className = yearMonth === currentYearMonth ? `text-secondary font-bold` : `dark:text-gray-300`

            return (
              <li key={yearMonth} className={`${className} transition-all`}>
                <a href={`#${yearMonth}`}>{yearMonth}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function PostsList({
  setCurrentYearMonth,
  allPostsGroupByYearMonth,
}: {
  setCurrentYearMonth: Function
  allPostsGroupByYearMonth: any
}) {
  const handleScroll = useCallback(
    throttle(() => {
      const postElements = (postListRef.current as any).querySelectorAll('.post-list') // Add a class to your post items

      postElements.forEach((postElement: any) => {
        const rect = postElement.getBoundingClientRect()

        if (rect.top < 150) {
          // The post is 150px from the top.
          const currentYearMonth = postElement.getAttribute('data-yearmonth')

          setCurrentYearMonth(currentYearMonth)
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
        {Object.keys(allPostsGroupByYearMonth)
          .sort((a, b) => +b - +a)
          .map(yearMonth => (
            <div className="post-list" key={yearMonth} data-yearmonth={yearMonth}>
              <h3 id={yearMonth} className="flex items-center text-xl mb-4 pl-2">
                <Icon name="calendar" className="w-6 h-6"></Icon>
                <span className="ml-2 text-secondary font-bold">{yearMonth}</span>
              </h3>
              {allPostsGroupByYearMonth[yearMonth]
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
      'year-month': getYearMonth(item.date),
      url: item.url,
      date: new Date(item.date).getTime(),
    }))
    .sort((a, b) => sortYearMonth(a['year-month'], b['year-month']))

  const allPostsGroupByYearMonth = groupBy(posts, 'year-month')

  const yearMonths = Array.from(new Set(posts.map(item => item['year-month']))).sort(sortYearMonth)

  const [currentYearMonth, setCurrentYearMonth] = useState(yearMonths[0])

  return (
    <div className="relative flex mt-8">
      <SiteTimeLine currentYearMonth={currentYearMonth} yearMonths={yearMonths} />

      <PostsList setCurrentYearMonth={setCurrentYearMonth} allPostsGroupByYearMonth={allPostsGroupByYearMonth} />
    </div>
  )
}
