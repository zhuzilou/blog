import Image from 'next/image'

import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

import Icon from '../common/SiteIcon'

function SiteHeroSection() {
  return (
    <>
      <div className="px-4 py-6 flex h-64 flex-col items-center bg-base-100 rounded-lg">
        <Image className="rounded-full hover:animate-spin" src="/avatar.jpg" width={96} height={96} alt="头像"></Image>

        <div className="text-xl font-bold">djdg626</div>
        <div className="flex mt-4 items-center">
          <span>上海某菜鸡前端</span>
        </div>
        <div className="mt-4 flex justify-center">
          <Icon name="bilibili" className="ml-3 w-6 h-6 text-info"></Icon>
          <Icon name="github" className="ml-3 w-6 h-6"></Icon>
        </div>
      </div>

      <style></style>
    </>
  )
}

function SiteCategorySection() {
  const tagsAndCounts = computeTags()

  const tags = Object.keys(tagsAndCounts).sort((a, b) => tagsAndCounts[b] - tagsAndCounts[a])

  return (
    <>
      <div className="mt-8 px-4 py-6 bg-base-100 rounded-lg">
        <div className="flex items-center text-info [&>.icon]:cursor-default">
          <div>标签</div>
          <Icon name="menu" className="ml-3 w-4 h-4"></Icon>
        </div>

        <div className="mt-4 flex flex-wrap">
          {tags.map(tag => {
            return (
              <div key={tag} className="flex-1 basis-20 shrink-0 px-2 py-1 text-center">
                <Link href={`/tags/${tag}`} className={`hover:text-secondary`}>
                  {tag}({tagsAndCounts[tag]})
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function SiteSidebar() {
  return (
    <div className="hidden sm:block ml-4 lg:w-72 w-56">
      <SiteHeroSection />

      <SiteCategorySection />
    </div>
  )
}

function computeTags() {
  const tags = allPosts.map(post => {
    return post.tag
  })

  // 使用对象来记录标签和计数
  const tagCount: { [key: string]: number } = {}

  tags.forEach(item => {
    // 使用正则表达式匹配标签
    const tags = (item || '').match(/[^,]+/g)
    if (tags) {
      tags.forEach(tag => {
        const trimmedTag = tag.trim()

        // 增加标签计数或初始化为 1
        tagCount[trimmedTag] = (tagCount[trimmedTag] || 0) + 1
      })
    } else {
      // 当 tags 不存在时，将默认标签计数加 1
      tagCount['默认'] = (tagCount['默认'] || 0) + 1
    }
  })

  return tagCount
}
