'use client'

import Image from 'next/image'

const imageLoader = ({ src, width, quality }: any) => {
  const url = new URL(`${src}`)

  console.log('url.href', url.href)

  return url.href
}

export default function ImgBlock(props: any) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      loader={imageLoader}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
      width={500}
      height={300}
    />
  )
}
