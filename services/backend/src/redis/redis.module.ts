import { CacheModule } from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { redisStore } from 'cache-manager-ioredis-yet'
import type { RedisOptions } from 'ioredis'

import { RedisService } from './redis.service'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      async useFactory(configService: ConfigService<APPConfig>) {
        return {
          store: await redisStore({
            port: configService.get('REDIS_PORT'),
            host: configService.get('REDIS_HOST'),
            ttl: 1e3 * 60 * 60 * 24
          })
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
