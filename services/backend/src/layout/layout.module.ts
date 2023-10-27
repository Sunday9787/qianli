import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, Global } from '@nestjs/common'
import { LayoutService } from './layout.service'
import { LayoutController } from './layout.controller'
import { LayoutEntity } from './layout.entity'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LayoutEntity])],
  providers: [LayoutService],
  exports: [LayoutService],
  controllers: [LayoutController]
})
export class LayoutModule {}
