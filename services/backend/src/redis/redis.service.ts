import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { RedisCache } from 'cache-manager-ioredis-yet'

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) public readonly cacheManager: RedisCache) {}
}
