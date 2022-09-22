import fs from 'fs'
import path from 'path'
import * as ejs from 'ejs'

// 获取ejs文件模板
export function compile(
  templatePath: string,
  data: Record<string, string>
): Promise<string> | undefined {
  if (fs.existsSync(templatePath)) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(templatePath, { data }, {}, (err, result) => {
        if (err) {
          console.log(err)
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }
}

// 将ejs模板文件写入新创建的文件
export function writeToFile(dirName: string, content: string) {
  return fs.promises.writeFile(dirName, content)
}

// 创建文件目录
export function createDir(dirName: string) {
  // 判断路径是否存在
  if (!fs.existsSync(dirName)) {
    if (createDir(path.dirname(dirName))) {
      fs.mkdirSync(dirName)
      return true
    }
    return true
  } else {
    return true
  }
}
