import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DepartmentEntity } from '@/common/department/department.entity'

import { JobController } from './job.controller'
import { JobEntity } from './job.entity'
import { JobService } from './job.service'

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity, DepartmentEntity])],
  providers: [JobService],
  controllers: [JobController],
  exports: [JobService]
})
export class JobModule {}
