import { allPosts } from 'contentlayer/generated'

export function computeTags() {
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
