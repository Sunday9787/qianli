import { Module } from '@nestjs/common'
import { JobModule } from '@/job/job.module'
import { LayoutModule } from '@/layout/layout.module'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'

@Module({
  imports: [LayoutModule, JobModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
