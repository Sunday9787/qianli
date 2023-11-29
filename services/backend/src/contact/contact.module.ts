import { TypeOrmModule } from '@nestjs/typeorm'
import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'

import { JobModule } from '@/job/job.module'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'
import { ContactEntity } from './contact.entity'
import { FeedbackModule } from './feedback/feedback.module'
import { AuthGuard } from '@/auth/auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), FeedbackModule, JobModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuard).exclude({ path: '/contact', method: RequestMethod.GET })
  }
}
