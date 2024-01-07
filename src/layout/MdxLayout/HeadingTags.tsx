import React from 'react'

interface HeadingProps {
  level: number
  children: React.ReactNode
}

const HeadingLevelClass = {
  1: 'mt-12 mb-4 pt-6 text-3xl',
  2: 'mt-12 mb-4 pt-6 text-2xl',
  3: 'mt-8 mb-2 pt-4 text-xl',
  4: 'mt-4 mb-2 pt-2 text-base text-red-500',
}

const Heading: React.FC<HeadingProps> = ({ level, children }) => {
  const url = decodeURIComponent(children as string)

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <HeadingTag
      id={`${url}`}
      className={`${
        HeadingLevelClass[level as keyof typeof HeadingLevelClass]
      } tracking-tight border-t transition-colors`}
    >
      <a href={`#${url}`}>
        <span className="mr-2 text-success">#</span>
        {children as string}
      </a>
    </HeadingTag>
  )
}

export const Heading1 = (props: any) => <Heading level={1} {...props} />
export const Heading2 = (props: any) => <Heading level={2} {...props} />
export const Heading3 = (props: any) => <Heading level={3} {...props} />
export const HeadingSmall = (props: any) => <Heading level={4} {...props} />
