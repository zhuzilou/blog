'use client'

import Giscus from '@giscus/react'
import { shallow } from 'zustand/shallow'
import { useThemeStore } from 'stores/theme-store'

export default function SiteComments(props: { slug: string }) {
  const isDark = useThemeStore(state => state.isDark, shallow)
  const env = {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO_NAME as `${string}/${string}`,
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID!,
    category: process.env.NEXT_PUBLIC_GISCUS_REPO_CATEGORY,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_REPO_CATEGORYID,
  }

  return (
    <Giscus
      id={props.slug}
      repo={env.repo}
      repoId={env.repoId}
      category={env.category}
      categoryId={env.categoryId}
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
