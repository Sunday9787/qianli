import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import path from 'node:path'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(path.join(process.cwd(), 'public'))
  app.setBaseViewsDir(path.join(process.cwd(), 'frontend/views'))
  app.setViewEngine('pug')

  await app.listen(3000)
}

bootstrap()
