import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { JobModule } from '@/job/job.module'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'
import { ContactEntity } from './contact.entity'
import { ContactFeedbackEntity } from './contact.feedback.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity, ContactFeedbackEntity]), JobModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
