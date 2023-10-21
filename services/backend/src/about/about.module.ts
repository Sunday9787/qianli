import { Module } from '@nestjs/common'
import { AboutService } from './about.service'
import { AboutController } from './about.controller'
import { LayoutService } from '@/layout/layout.service'

@Module({
  controllers: [AboutController],
  providers: [AboutService, LayoutService]
})
export class AboutModule {}
