import { DepartmentService, type DepartmentDTO } from '@/api/common'
import { AbstractEntity } from '@/class/abstractDTO'
import { Expose, plainToInstance } from 'class-transformer'

export class DepartmentEntity extends AbstractEntity implements DepartmentDTO {
  private static readonly service = new DepartmentService()
  static async select() {
    return plainToInstance(DepartmentEntity, await DepartmentEntity.service.select(), { excludeExtraneousValues: true })
  }

  @Expose() id = 0
  @Expose() department_name!: string

  constructor() {
    super()
    this.init()
  }

  save() {
    return DepartmentEntity.service.save(this.toJSON())
  }

  del() {
    return DepartmentEntity.service.del(this.id)
  }
}
