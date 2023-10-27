import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { JobController } from './job.controller'
import { JobService } from './job.service'
import { JobEntity } from './job.entity'
import { DepartmentEntity } from '@/common/department/department.entity'

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity, DepartmentEntity])],
  providers: [JobService],
  controllers: [JobController],
  exports: [JobService]
})
export class JobModule {}
