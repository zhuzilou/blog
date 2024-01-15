/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect, useState } from 'react'
import { throttle, groupBy } from 'lodash'
import { allPosts as _allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { getYear } from '@/lib/getYear'
import Icon from '@/components/SiteIcon'

const allPosts = _allPosts
  .map(item => ({
    title: item.title,
    year: getYear(item.date),
    url: item.url,
  }))
  .sort((a, b) => b.year - a.year)

const allPostsGroupByYear = groupBy(allPosts, 'year')

const years = Array.from(new Set(allPosts.map(item => item.year))).sort((a, b) => b - a)

function SiteTimeLine({ currentYear }: { currentYear: number }) {
  return (
    <div className="w-1/4 pr-4 flex flex-col min-h-full">
      <h3 className="text-2xl font-bold">时间线</h3>
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
  )
}

function PostsList({ setCurrentYear }: { setCurrentYear: Function }) {
  const handleScroll = useCallback(
    throttle(() => {
      const postElements = document.querySelectorAll('.post-list') // Add a class to your post items
      let currentYear = getYear()

      postElements.forEach(postElement => {
        const rect = postElement.getBoundingClientRect()

        if (rect.top < 150) {
          // The post is 150px from the top.
          currentYear = parseInt(postElement.getAttribute('data-year') as string)
        }
      })

      setCurrentYear(currentYear)
    }, 300),
    []
  )

  useEffect(() => {
    const postsScrollList = document.querySelector('#posts-scroll-list') as Element

    postsScrollList.addEventListener('scroll', handleScroll)
    return () => {
      postsScrollList.removeEventListener('scroll', handleScroll)
    }
  }, []) // Add an empty dependency array to ensure the effect runs only once

  return (
    <div id="posts-scroll-list" className="w-3/4 overflow-auto">
      <div className="space-y-6">
        {Object.keys(allPostsGroupByYear)
          .sort((a, b) => +b - +a)
          .map(year => (
            <div className="post-list" key={year} data-year={year}>
              <h3 className="flex items-center text-xl mb-4 pl-2">
                <Icon name="calendar" className="w-6 h-6"></Icon>
                <span className="ml-2 text-secondary font-bold">{year}</span>
              </h3>
              {allPostsGroupByYear[year].map((item, index) => (
                <div key={index} className='overflow-hidden'>
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

export default function SiteArchivesPosts() {
  const [currentYear, setCurrentYear] = useState(getYear())

  return (
    <div className="flex mt-8 max-h-[calc(100vh-20.2rem)]">
      <SiteTimeLine currentYear={currentYear} />

      <PostsList setCurrentYear={setCurrentYear} />
    </div>
  )
}
