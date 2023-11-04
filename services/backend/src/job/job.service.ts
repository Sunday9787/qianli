import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { JobEntity } from './job.entity'
import { JobDTO, JobEditDTO } from './job.dto'

class RenderJobDTO extends JobDTO {
  id: number
  department_name: string
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
  all(): Promise<RenderJobDTO[]> {
    return this.jobRepository.find({ relations: { department: true } }).then(function (result) {
      return result.map(buildRenderJobDTO)
    })
  }
}
