import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeedbackService } from './feedback.service'
import { FeedbackController } from './feedback.controller'
import { FeedbackEntity } from './feedback.entity'
import { AuthGuard } from '@/auth/auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity])],
  providers: [FeedbackService],
  controllers: [FeedbackController]
})
export class FeedbackModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuard).exclude({ path: 'contact/feedback', method: RequestMethod.PUT })
  }
}
