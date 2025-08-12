// 文件名：organize_posts.js
const fs = require('fs')
const path = require('path')

const postsDir = 'source/_posts'

fs.readdir(postsDir, (err, files) => {
  if (err) throw err

  files
    .filter((file) => file.endsWith('.md'))
    .forEach((file) => {
      const filePath = path.join(postsDir, file)
      const stats = fs.statSync(filePath)

      // 获取年份和月份
      const year = stats.birthtime.getFullYear().toString()
      const month = (stats.birthtime.getMonth() + 1).toString().padStart(2, '0') // 月份补零

      // 创建年/月目录路径
      const yearDir = path.join(postsDir, year)
      const monthDir = path.join(yearDir, month)

      // 递归创建目录
      if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir)
      }
      if (!fs.existsSync(monthDir)) {
        fs.mkdirSync(monthDir)
      }

      // 移动文件
      fs.renameSync(filePath, path.join(monthDir, file))
      console.log(`Moved ${file} to ${year}/${month}/`)
    })

  console.log('文章整理完成！')
})
