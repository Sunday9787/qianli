import { Between, Like, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { JobEntity } from './job.entity'
import { JobDTO, JobQueryDTO } from './job.dto'
import { QianliQuery } from '@/class/query'

class RenderJobDTO extends JobDTO {
  id: number
  department_name: string
}

function buildJobDTO(entity: JobEntity) {
  const dto = new JobDTO()
  dto.id = entity.id
  dto.title = entity.title
  dto.city = entity.city
  dto.num = entity.num
  dto.status = entity.status
  dto.department_id = entity.department_id
  dto.requirement = entity.requirement
  dto.responsibility = entity.responsibility
  dto.created = entity.created
  dto.updated = entity.updated

  return dto
}

function buildRenderJobDTO(entity: JobEntity) {
  const dto = new RenderJobDTO()
  dto.title = entity.title
  dto.num = entity.num
  dto.department_name = entity.department.department_name
  dto.department_id = entity.department_id
  dto.city = entity.city
  dto.requirement = entity.requirement
  dto.responsibility = entity.responsibility

  return dto
}

@Injectable()
export class JobService {
  constructor(@InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>) {}

  async save(body: JobDTO) {
    await this.jobRepository.save(body)
  }

  async del(id: number) {
    await this.jobRepository.delete({ id })
  }

  all(query: JobQueryDTO) {
    const qianliQuery = new QianliQuery(query, function (entity: JobEntity) {
      return buildJobDTO(entity)
    })

    return this.jobRepository
      .findAndCount({
        where: {
          title: query.title ? Like(`%${query.title}%`) : null,
          city: query.city ? Like(`%${query.city}%`) : null,
          department_id: query.department_id ?? null,
          status: query.status ?? null,
          created:
            query.created_start && query.created_end
              ? Between(new Date(query.created_start), new Date(query.created_end))
              : null
        }
      })
      .then(function (result) {
        return qianliQuery.data(result)
      })
  }

  /**
   * 所有已发布职位列表
   */
  list(): Promise<RenderJobDTO[]> {
    return this.jobRepository.find({ where: { status: 1 }, relations: { department: true } }).then(function (result) {
      return result.map(buildRenderJobDTO)
    })
  }
}
