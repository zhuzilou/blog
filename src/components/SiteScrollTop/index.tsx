'use client'

import Icon from '../SiteIcon'

export default function SiteScrollTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    })
  }

  return (
    <button
      className="fixed right-3 bottom-3 flex justify-center items-center w-10 h-10 hover:opacity-100 rounded-full hover:bg-base-300 transition duration-300 z-40 print:hidden"
      onClick={() => scrollToTop()}
    >
      <span className="sr-only">Scroll To Top</span>
      <Icon name="top" className={`w-4 h-4`} />
    </button>
  )
}
