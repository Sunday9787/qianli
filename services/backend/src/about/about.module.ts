import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AboutController } from './about.controller'
import { AboutEntity } from './about.entity'
import { AboutService } from './about.service'

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity])],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule {}
