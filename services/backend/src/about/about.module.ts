import { TypeOrmModule } from '@nestjs/typeorm'
import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { AboutService } from './about.service'
import { AboutController } from './about.controller'
import { AboutEntity } from './about.entity'
import { AuthGuard } from '@/auth/auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity])],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuard).exclude({ path: '/about', method: RequestMethod.GET })
  }
}
