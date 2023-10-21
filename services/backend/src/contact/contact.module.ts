import { Module } from '@nestjs/common'
import { ContactController } from './contact.controller'
import { ContactService } from './contact.service'
import { LayoutService } from '@/layout/layout.service'

@Module({
  controllers: [ContactController],
  providers: [ContactService, LayoutService]
})
export class ContactModule {}
