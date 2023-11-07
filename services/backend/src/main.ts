import path from 'node:path'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { HttpExceptionFilter } from './filters/http-exception'
import { AppModule } from './app.module'

const projectRoot = path.join(process.cwd(), '..', '..')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useStaticAssets(path.join(projectRoot, 'public'))
  app.setBaseViewsDir(path.join(projectRoot, 'services/frontend/src/view'))
  app.setViewEngine('pug')
  app.setGlobalPrefix('api', {
    exclude: [
      '/',
      '/about',
      '/product',
      { path: '/product/detail', method: 0 },
      '/news',
      '/contact',
      '/post',
      { path: '/post/:id', method: 0 }
    ]
  })
  app.enableCors({
    origin: '*',
    maxAge: 1000 * 60 * 60,
    exposedHeaders: ['Content-Disposition'],
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Authorization',
      'Accept-Language',
      'Content-Language',
      'Accept',
      'X-Requested-With',
      'Origin',
      'Content-Disposition'
    ]
  })

  await app.listen(3000)
}

bootstrap()
