import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'

import { DepartmentDTO } from './department.dto'
import { DepartmentEntity } from './department.entity'

@Injectable()
export class DepartmentService {
  constructor(@InjectRepository(DepartmentEntity) private readonly repository: Repository<DepartmentEntity>) {}

  all() {
    return this.repository.find().then(function (entity) {
      return plainToInstance(DepartmentDTO, entity)
    })
  }

  save(body: DepartmentDTO) {
    return this.repository.save(body)
  }

  del(id: number) {
    return this.repository.delete({ id })
  }
}
