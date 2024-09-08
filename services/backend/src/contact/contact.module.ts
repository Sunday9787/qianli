import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JobModule } from '@/job/job.module'

import { ContactController } from './contact.controller'
import { ContactEntity } from './contact.entity'
import { ContactService } from './contact.service'
import { FeedbackModule } from './feedback/feedback.module'

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), FeedbackModule, JobModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
