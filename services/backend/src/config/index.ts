import fs from 'node:fs'
import path from 'node:path/posix'
import yaml from 'js-yaml'

type ReadonlyDeep<T> = { readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P] }

interface IConfig {
  REDIS: {
    REDIS_HOST: string
    REDIS_PORT: number
    REDIS_DB: number
  }
  DATA_BASE: {
    DATA_BASE_HOST: string
    DATA_BASE_PORT: number
    DATA_BASE_USERNAME: string
    DATA_BASE_PASSWORD: string
    DATA_BASE_DATABASE: string
  }
  GLOBAL: {
    SESSION: {
      NAME: string
      SECRET: string
    }
    CORS: {
      ORIGIN: string[]
    }
    DOMAIN: {
      RESOURCE: string
    }
    TOKEN_SECRET: string
  }
}

export type Config = ReadonlyDeep<IConfig>

export function config() {
  let env = 'env.local.yaml'

  if (process.env.NODE_ENV === 'production') {
    env = 'env.yaml'
  }

  return yaml.load(fs.readFileSync(path.join(process.cwd(), env), 'utf-8')) as Config
}

export default config()
