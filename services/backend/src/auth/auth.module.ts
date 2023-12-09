import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RedisModule } from '@/redis/redis.module'
import { AuthController } from './auth.controller'

@Global()
@Module({
  imports: [RedisModule],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
