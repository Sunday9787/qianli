import { Module } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'
import { DetailService } from './detail.service'
import { DetailController } from './detail.controller'

@Module({
  controllers: [DetailController],
  providers: [DetailService, LayoutService],
  exports: [DetailService]
})
export class DetailModule {}
