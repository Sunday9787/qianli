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