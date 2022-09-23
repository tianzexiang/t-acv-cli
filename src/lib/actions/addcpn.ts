import path from 'path'
import { compile, createDir, writeToFile } from '../../utils'

interface IOptions {
  type?: string
  framework?: string
}

export async function addComponentAction(
  filename: string,
  dest = 'src/components',
  { type = 'vue', framework }: IOptions = {}
) {
  if (type.includes('vue')) {
    const targetDest = path.resolve(dest)
    createVueTemplate(filename, targetDest, framework)
  }
  if (type.includes('react')) {
    const targetDest = path.resolve(dest, filename)
    createReactTemplate(filename, targetDest)
  }
}

async function createVueTemplate(
  filename: string,
  targetDest: string,
  framework?: string
) {
  const templatePath = framework
    ? path.resolve(framework)
    : path.resolve(__dirname,'../../../templates/t-vue.ejs')
  const component = await compile(templatePath, { filename })
  const componentPath = path.resolve(targetDest, `${filename}.vue`)
  if (createDir(targetDest) && component) {
    writeToFile(componentPath, component)
  }
}
async function createReactTemplate(
  filename: string,
  targetDest: string,
  framework?: string
) {
  const templatePath = framework
    ? path.resolve(framework)
    : path.resolve(__dirname, '../../../templates/t-react.ejs')
  const component = await compile(templatePath, { filename })
  const componentPath = path.resolve(targetDest, `index.tsx`)
  const stylePath = path.resolve(targetDest, `style.module.css`)
  if (createDir(targetDest) && component) {
    writeToFile(componentPath, component)
    writeToFile(stylePath, '')
  }
}
