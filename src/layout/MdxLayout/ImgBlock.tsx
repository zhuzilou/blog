'use client'

import Image from 'next/image'

const imageLoader = ({ src, width, quality }: any) => {
  console.log('wrong src', src)

  return `${src}`
}

export default function ImgBlock(props: any) {
  return (
    <Image src={props.src} alt={props.alt} width={300} height={100} />
    // <Image
    //   src={props.src}
    //   alt={props.alt}
    //   sizes="100vw"
    //   style={{
    //     width: '100%',
    //     height: 'auto',
    //   }}
    //   loader={imageLoader}
    //   width={500}
    //   height={300}
    //   unoptimized
    // />
  )
}
