'use client'

import Giscus from '@giscus/react'

export default function SiteComments(props: { slug: string }) {
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
      theme={'dark'}
      lang="zh-CN"
      loading="lazy"
    />
  )
}
