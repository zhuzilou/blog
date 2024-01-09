import Image from 'next/image'

export default function ImgBlock(props: any) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
      width={500}
      height={300}
    ></Image>
  )
}
