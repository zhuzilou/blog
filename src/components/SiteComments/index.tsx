'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export default function SiteComments(props: { slug: string }) {
  const { theme } = useTheme()

  return (
    <Giscus
      id={props.slug}
      repo="zhangwh754/blog-comments"
      repoId="R_kgDOLBAVFw"
      category="Announcements"
      categoryId="DIC_kwDOLBAVF84CcNVV"
      mapping="title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={theme === 'light' ? theme : 'dark'}
      lang="zh-CN"
      loading="lazy"
    />
  )
}
