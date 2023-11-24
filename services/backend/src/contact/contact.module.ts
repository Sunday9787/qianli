import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { JobModule } from '@/job/job.module'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'
import { ContactEntity } from './contact.entity'
import { FeedbackModule } from './feedback/feedback.module'

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), FeedbackModule, JobModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
