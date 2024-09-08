import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LayoutController } from './layout.controller'
import { LayoutEntity } from './layout.entity'
import { LayoutService } from './layout.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LayoutEntity])],
  providers: [LayoutService],
  exports: [LayoutService],
  controllers: [LayoutController]
})
export class LayoutModule {}
