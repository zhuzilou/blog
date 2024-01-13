'use client'

import { useEffect, useRef } from 'react'
import Icon from '../SiteIcon'
import { useOnWindowScroll } from 'hooks'

function scroll(btnToTop: Element) {
  // 获取滚动位置
  const scrollPosition = window.scrollY

  if (scrollPosition > 500) {
    btnToTop.classList.remove('hidden')
    btnToTop.classList.add('block')
  } else {
    btnToTop.classList.remove('block')
    btnToTop.classList.add('hidden')
  }
}

export default function SiteScrollTop() {
  const btnToTopRef = useRef(null)

  useOnWindowScroll(() => {
    scroll(btnToTopRef.current as unknown as Element)
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  return (
    <button
      ref={btnToTopRef}
      className="hidden fixed right-3 bottom-3 flex justify-center items-center w-10 h-10 hover:opacity-100 rounded-full hover:bg-base-300 dark:hover:bg-slate-500 transition duration-300 z-40 print:hidden"
      onClick={() => scrollToTop()}
    >
      <span className="sr-only">Scroll To Top</span>
      <Icon name="top" className={`w-4 h-4 text-black dark:text-white`} />
    </button>
  )
}
