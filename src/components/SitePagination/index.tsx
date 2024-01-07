'use client'

import { allPosts } from 'contentlayer/generated'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import dataConfig from 'data'

function NavigationButton({
  isNext,
  currentPageNum,
  totalPages,
}: {
  isNext: Boolean
  currentPageNum: number
  totalPages: number
}) {
  const router = useRouter()

  const navigate = () => {
    router.push(`/?pageNum=${isNext ? currentPageNum + 1 : currentPageNum - 1}`)
  }

  const buttonText = isNext ? 'Next' : 'Previous'
  const isDisabled = (isNext && currentPageNum === totalPages) || (!isNext && currentPageNum === 1)

  return (
    <div className="w-8 cursor-pointer">
      {isDisabled ? <div className="text-base-300">{buttonText}</div> : <div onClick={navigate}>{buttonText}</div>}
    </div>
  )
}

export default function SitePagination() {
  const [currentPageNum, setCurrentPageNum] = useState(1)

  const total = allPosts.length
  const pageSize = dataConfig.totalPageSize
  const totalPages = Math.ceil(total / pageSize)

  const query = useSearchParams().get('pageNum')

  useEffect(() => {
    if (query !== null) {
      setCurrentPageNum(Number(query))
    }
  }, [query])

  return (
    <div className="mt-4 p-4 flex justify-between items-center bg-base-100 rounded-lg">
      <NavigationButton isNext={false} currentPageNum={currentPageNum} totalPages={totalPages} />

      <div>
        {currentPageNum} of {totalPages}
      </div>

      <NavigationButton isNext={true} currentPageNum={currentPageNum} totalPages={totalPages} />
    </div>
  )
}
