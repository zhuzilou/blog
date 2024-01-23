const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// 获取当前目录下所有mdx文件的前缀数字
function getExistingPrefixNumbers() {
  const files = fs.readdirSync(__dirname)
  const prefixNumbers = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => parseInt(file.split('.')[0], 10))
    .filter(prefix => !isNaN(prefix))
  return prefixNumbers
}

rl.question('请输入标题: ', title => {
  rl.question('请输入标签: ', tag => {
    rl.question('请输入描述: ', description => {
      rl.close()
      const currentDate = new Date().toISOString().slice(0, 10)
      const existingPrefixNumbers = getExistingPrefixNumbers()
      const newPrefixNumber = existingPrefixNumbers.length > 0 ? Math.max(...existingPrefixNumbers) + 1 : 1
      const paddedPrefix = String(newPrefixNumber).padStart(3, '0')
      const fileName = `${paddedPrefix}-${title}.mdx`
      const filePath = path.join(__dirname, fileName)
      const content = `---
title: ${title}
date: ${currentDate}
tag: ${tag}
description: ${description}
---

## 标题
`
      fs.writeFile(filePath, content, err => {
        if (err) {
          console.error('文件创建失败:', err)
        } else {
          console.log(`文件已成功创建: ${fileName}`)
        }
      })
    })
  })
})
