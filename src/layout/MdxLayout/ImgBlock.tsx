'use client'

import Image from 'next/image'

// const imageLoader = ({ src, width, quality }: any) => {
//   const url = new URL(`${src}?imageMogr2/thumbnail/${width}x/format/webp`)

//   return url.href
// }

export default function ImgBlock(props: any) {
  // const galleryItemHref = new URL(`${props.src}?imageMogr2/format/webp`).href

  return (
    <a className="gallery-item" data-src={props.src} href={props.src}>
      <Image
        src={props.src}
        alt={props.alt}
        loader={undefined}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        priority={true}
        width={500}
        height={300}
      />
    </a>
  )
}
