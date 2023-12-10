import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
const projectRoot = path.join(process.cwd(), '..', '..')

export function loadYaml<R>(fileName: string) {
  const yamlFile = fs.readFileSync(path.join(projectRoot, fileName), {
    encoding: 'utf-8'
  })
  return yaml.load(yamlFile) as R
}

export function getToken(str?: string): string | null {
  if (!str) return null
  const token = str.split(' ')

  return token ? token[1] : null
}

const regExp = {
  fileExt: /(\.(?!\d)[a-zA-Z\d]+)$/
}

/**
 * 获取文件后缀
 *
 * @export
 * @param {string} file
 * @returns
 */
export function fileExt(file: string) {
  const ext = file.match(regExp.fileExt)
  return ext && ext[0]
}

/**
 * 通过带后缀文件名 获取 文件名(不带后缀)
 */
export function fileName(name: string) {
  return name.replace(regExp.fileExt, '')
}
