import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import path from 'node:path'
import { AppModule } from './app.module'

const projectRoot = path.join(process.cwd(), '..', '..')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(path.join(projectRoot, 'public'))
  app.setBaseViewsDir(path.join(projectRoot, 'services/frontend/src/view'))
  app.setViewEngine('pug')
  app.setGlobalPrefix('api', { exclude: ['/', '/about', '/product', '/news', '/contact', '/post/:id'] })

  await app.listen(3000)
}

bootstrap()
