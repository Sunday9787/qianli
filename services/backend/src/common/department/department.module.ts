import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentService } from './department.service'
import { DepartmentController } from './department.controller'
import { DepartmentEntity } from './department.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
