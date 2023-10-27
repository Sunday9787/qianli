import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { JobEntity } from './job.entity'
import { JobDTO, JobEditDTO } from './job.dto'
import { DepartmentEntity } from '@/common/department/department.entity'

const sql = `
  job.id,
  job.title,
  job.num,
  job.department_id,
  job.city,
  job.requirement,
  job.responsibility,
  department.department_name
`

@Injectable()
export class JobService {
  constructor(@InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>) {}

  add(body: JobDTO) {
    return this.jobRepository.save(body)
  }

  edit(body: JobEditDTO) {
    return this.jobRepository.update({ id: body.id }, body)
  }

  del(id: number) {
    return this.jobRepository.delete({ id })
  }

  /**
   * 所有职位
   */
  all() {
    return this.jobRepository
      .createQueryBuilder('job')
      .innerJoin(DepartmentEntity, 'department', 'job.department_id = department.id')
      .select(sql)
      .getRawMany<JobEntity>()
  }
}
