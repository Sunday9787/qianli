import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RedisModule } from '@/redis/redis.module'

@Global()
@Module({
  imports: [RedisModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
