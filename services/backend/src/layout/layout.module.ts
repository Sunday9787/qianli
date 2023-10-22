import { Module, Global } from '@nestjs/common'
import { LayoutService } from './layout.service'

@Global()
@Module({
  providers: [LayoutService],
  exports: [LayoutService]
})
export class LayoutModule {}
