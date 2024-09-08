import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FeedbackController } from './feedback.controller'
import { FeedbackEntity } from './feedback.entity'
import { FeedbackService } from './feedback.service'

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity])],
  providers: [FeedbackService],
  controllers: [FeedbackController]
})
export class FeedbackModule {}
