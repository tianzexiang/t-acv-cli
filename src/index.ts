#!/usr/bin/env node

import { program } from 'commander'
import path from 'path'
import { addComponentAction } from './lib/actions'

const helpOptions = () => {
  program.option('-d --dest <dest>', '配置目标路径,例如: -d /src/components')
  program.option('-t --type <type>', '配置所用框架,例如: -t vue')
  program.option(
    '-f --framework <framework>',
    '自己的模板文件目录,例如: -f templates/vue.ejs'
  )
}

const createCommands = () => {
  const options = program.opts()
  program
    .command('cpn <name>')
    .description('自动创建组件')
    .option('-d', '指定创建目录')
    .action(name => {
      addComponentAction(
        name.slice(0, 1).toUpperCase() + name.slice(1),
        options.dest,
        { type: options.type, framework: options.framework }
      )
    })
}

// 查看版本号
program.version(
  require(path.resolve(__dirname, '..', 'package.json')).version,
  '-v --version',
  '查看版本号'
)

// 配置help指令
helpOptions()

// 创建其他指令
createCommands()

// 解析终端指令
program.parse(process.argv)
