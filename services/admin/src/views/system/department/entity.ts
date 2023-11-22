import { DepartmentService, type DepartmentDTO } from '@/api/common'
import { AbstractEntity } from '@/class/abstractDTO'
import { Expose, plainToInstance } from 'class-transformer'

export class DepartmentEntity extends AbstractEntity<DepartmentService> implements DepartmentDTO {
  @Expose() id = 0
  @Expose() department_name!: string

  constructor() {
    super(new DepartmentService())
    this.init()
  }

  async select() {
    return plainToInstance(DepartmentEntity, await this.service.select(), { excludeExtraneousValues: true })
  }

  save() {
    return this.service.save(this.toJSON())
  }

  del() {
    return this.service.del(this.id)
  }
}
