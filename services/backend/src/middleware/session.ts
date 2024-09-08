import crypto from 'node:crypto'

import { Injectable, NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.uuid) {
      const uuid = crypto.randomUUID({ disableEntropyCache: true })
      req.session.uuid = uuid
    }
    next()
  }
}
