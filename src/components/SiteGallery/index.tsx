'use client'

import LightGallery from 'lightgallery/react'
// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

// import styles
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

export default function Gallery({
  children,
  selector = '.gallery-item',
}: {
  children: React.ReactNode
  selector?: string
}) {
  return (
    <LightGallery
      selector={selector}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      onAfterOpen={() => document.documentElement.classList.add('overflow-hidden')}
      onAfterClose={() => document.documentElement.classList.remove('overflow-hidden')}
    >
      {children}
    </LightGallery>
  )
}
