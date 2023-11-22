import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DepartmentEntity } from './department.entity'
import { DepartmentDTO } from './department.dto'

function buildDTO(entity: DepartmentEntity) {
  const dto = new DepartmentDTO()
  dto.id = entity.id
  dto.department_name = entity.department_name

  return dto
}

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity) private readonly departmentRepository: Repository<DepartmentEntity>
  ) {}

  all() {
    return this.departmentRepository.find().then(function (result) {
      return result.map(buildDTO)
    })
  }

  save(body: DepartmentDTO) {
    return this.departmentRepository.save(body)
  }

  del(id: number) {
    return this.departmentRepository.delete({ id })
  }
}
