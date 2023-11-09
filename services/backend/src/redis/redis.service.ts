import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
  public readonly redis = new Redis({
    port: this.configService.get('REDIS_PORT'),
    host: this.configService.get('REDIS_HOST')
  })
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}
}
