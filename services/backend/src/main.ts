import path from 'node:path'

import { Logger, RequestMethod } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import manifest from 'backend/manifest.json'
import session from 'express-session'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './filters/http-filter'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { NoCacheMiddleware } from './middleware/nocache'

const projectRoot = path.join(process.cwd(), '..', '..')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config = app.get<ConfigService<APPConfig>>(ConfigService)

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(NoCacheMiddleware.middleware)
  app.use(
    session({
      name: 'SESSION_ID',
      rolling: true,
      secret: 'ZF5BRFCaeFI',
      resave: false,
      cookie: { secure: false, httpOnly: false, maxAge: 2 * 60 * 60 * 1000 },
      saveUninitialized: false
    })
  )

  app.setBaseViewsDir(path.join(projectRoot, 'services/frontend/src/view'))
  app.setViewEngine('pug')
  app.setGlobalPrefix('api', {
    exclude: [
      '/',
      '/about',
      '/product',
      { path: '/product/detail', method: RequestMethod.GET },
      '/news',
      '/contact',
      '/post',
      { path: '/post/:id', method: RequestMethod.GET }
    ]
  })
  app.enableCors({
    origin: (config.get('CORS_ORIGIN') as string).split(','),
    credentials: true,
    maxAge: 1 * 60 * 60 * 1000,
    exposedHeaders: ['Content-Disposition'],
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Content-Range',
      'Authorization',
      'Accept-Language',
      'Content-Language',
      'Range',
      'Accept',
      'X-Requested-With',
      'Origin',
      'Content-Disposition'
    ]
  })

  app.setLocal('DOMAIN_RESOURCE', config.get('DOMAIN_RESOURCE'))
  app.setLocal('MANIFEST', manifest)

  await app.listen(3000)
  Logger.log('http://localhost:3000', 'ServerStartAt')
}

bootstrap()
