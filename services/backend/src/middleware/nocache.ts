import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class NoCacheMiddleware implements NestMiddleware {
  static middleware(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
    }
    next()
  }

  use = NoCacheMiddleware.middleware
}
