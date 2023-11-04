import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AboutService } from './about.service'
import { AboutController } from './about.controller'
import { AboutEntity } from './about.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity])],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule {}
