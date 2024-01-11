'use client'

import Giscus from '@giscus/react'
import { useThemeStore } from 'stores/theme-store'

export default function SiteComments(props: { slug: string }) {
  const isDark = useThemeStore(state => state.isDark)

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
      theme={isDark ? 'dark' : 'light'}
      lang="zh-CN"
      loading="lazy"
    />
  )
}
