import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { RedisCache } from 'cache-manager-ioredis-yet'
import { type Redis } from 'ioredis'

@Injectable()
export class RedisService {
  public readonly client: Redis = this.cacheManager.store.client as Redis
  constructor(@Inject(CACHE_MANAGER) public readonly cacheManager: RedisCache) {}
}
