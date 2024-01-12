/**
 * @description: 获取md内容中的全部二级、三级标题
 * @param {string} fileContent
 */
export function getTitles(fileContent: string) {
  // 使用正则表达式匹配二级和三级标题
  const headingPattern = /^(##\s+|###\s+)(.+)/gm
  const matches = []
  let match

  while ((match = headingPattern.exec(fileContent)) !== null) {
    // match[1] 匹配到的是标题的标识符（## 或 ###）
    // match[2] 匹配到的是标题的内容
    matches.push({
      level: match[1].trim(), // 提取标题级别
      content: match[2].trim(), // 提取标题内容
    })
  }

  return matches
}
