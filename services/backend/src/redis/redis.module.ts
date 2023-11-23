import type { RedisOptions } from 'ioredis'
import { Module, Global } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-ioredis-yet'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisService } from './redis.service'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          store: redisStore,
          port: configService.get('REDIS_PORT'),
          host: configService.get('REDIS_HOST')
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
