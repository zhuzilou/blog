'use client'

import Image from 'next/image'

const imageLoader = ({ src, width, quality }: any) => {
  console.log(`${src}?imageView2/2/w/${width}/q/${quality}`)

  // return `${src}?imageView2/2/w/${width}/q/${quality}`
  return `${src}`
}

export default function ImgBlock(props: any) {
  return (
    <div className="relative my-4 w-auto h-[20vw]">
      <Image
        src={props.src}
        alt="博文图片"
        quality={75}
        loader={imageLoader}
        fill={true}
        priority={false}
        className="object-contain"
      ></Image>
    </div>
  )
}
