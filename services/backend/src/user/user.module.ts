import { type MiddlewareConsumer, type NestModule, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthGuard } from '@/auth/auth.guard'
import { UserService } from './user.service'
import { UserController } from './user.controller'

import { UserEntity } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuard).exclude({ path: '/user/login', method: RequestMethod.POST })
  }
}
