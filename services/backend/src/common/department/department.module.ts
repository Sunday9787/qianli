import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DepartmentController } from './department.controller'
import { DepartmentEntity } from './department.entity'
import { DepartmentService } from './department.service'

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
