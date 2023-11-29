import type { AbstractEntityMethod, EntityJSON, EntityQuery } from '@/class/abstractEntity'
import { AbstractEntity } from '@/class/abstractEntity'
import { Expose } from 'class-transformer'
import { JobService } from './job.service'

export class JobQueryEntity {
  @Expose() status!: 0 | 1
  @Expose() title!: string
  @Expose() department_id!: number
  @Expose() city!: string
  @Expose() created_start!: number
  @Expose() created_end!: number
}

export type JobEntityJSON = EntityJSON<JobEntity>

export class JobEntity extends AbstractEntity implements AbstractEntityMethod {
  private static service = new JobService()

  public static statusMap = new Map<
    JobEntity['status'],
    { type: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'; label: string }
  >([
    [0, { type: 'info', label: '未发布' }],
    [1, { type: 'success', label: '已发布' }]
  ])

  public static statusOptions = Array.from(JobEntity.statusMap.entries(), ([id, item]) => ({
    id,
    label: item.label
  }))

  public static form() {
    return new JobQueryEntity()
  }

  public static del(id: number) {
    return JobEntity.service.del(id)
  }

  public static select(data: EntityQuery<JobQueryEntity & AppRequest.List>) {
    return JobEntity.service.select(data)
  }

  public copy(data: JobEntityJSON) {
    this.id = data.id
    this.num = data.num
    this.city = data.city
    this.title = data.title
    this.requirement = data.requirement
    this.department_id = data.department_id
    this.responsibility = data.responsibility
  }

  @Expose() id: number
  @Expose() title!: string
  @Expose() num = 1
  @Expose() department_id!: number
  @Expose() city!: string
  @Expose() requirement!: string
  @Expose() responsibility!: string
  readonly status!: 0 | 1
  readonly updated!: string
  readonly created!: string

  constructor(id = 0) {
    super()
    this.id = id
    this.init()
  }

  save() {
    return JobEntity.service.save(this.toJSON())
  }
}
