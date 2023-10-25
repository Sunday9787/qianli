import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DepartmentEntity } from './department.entity'
import { DepartmentDTO, DepartmentUpdateDTO } from './department.dto'

@Injectable()
export class DepartmentService {
  constructor(@InjectRepository(DepartmentEntity) private departmentRepository: Repository<DepartmentEntity>) {}

  add(body: DepartmentDTO) {
    return this.departmentRepository.save(body)
  }

  del(id: number) {
    return this.departmentRepository.delete({ id })
  }

  edit(body: DepartmentUpdateDTO) {
    return this.departmentRepository.update({ id: body.id }, body)
  }
}
