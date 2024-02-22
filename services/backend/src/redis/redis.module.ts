import type { RedisOptions } from 'ioredis'
import { Module, Global } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-ioredis-yet'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisService } from './redis.service'
import type { Config } from '@/config'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory(configService: ConfigService<Config>) {
        return {
          store: redisStore,
          port: configService.get('REDIS.REDIS_PORT', { infer: true }),
          host: configService.get('REDIS.REDIS_HOST', { infer: true })
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
