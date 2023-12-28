import path from 'node:path'
import session from 'express-session'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import type { Response } from 'express'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { HttpExceptionFilter } from './filters/http-exception'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

const projectRoot = path.join(process.cwd(), '..', '..')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
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
  app.useStaticAssets(path.join(projectRoot, 'public'), {
    maxAge: '30d',
    setHeaders(res: Response) {
      res.setHeader('Access-Control-Allow-Origin', '*')
    }
  })
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
    origin: 'http://localhost:5173',
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

  await app.listen(3000)
  Logger.log('http://localhost:3000', 'Server Start At')
}

bootstrap()
