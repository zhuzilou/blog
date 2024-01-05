// contentlayer.config.ts
import crypto from 'crypto'

import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => {
        const hashPath = generateShortLink(post._raw.flattenedPath)

        return hashPath
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})

// 使用SHA-256哈希函数生成唯一短链接
function generateShortLink(fileName: string) {
  const hash = crypto.createHash('sha256')
  hash.update(fileName)
  const shortLink = hash.digest('hex').slice(0, 10) // 取哈希值的前10个字符
  return shortLink
}
