import type { EntityMethod, EntityJSON, EntityQuery } from '@/class/abstractEntity'
import { AbstractEntity } from '@/class/abstractEntity'
import { Expose } from 'class-transformer'
import { FeedbackService } from './feedback.service'

export class FeedbackQueryEntity {
  name!: string
  contact!: string
  area!: string
  message!: string
}

export type FeedbackEntityJSON = EntityJSON<FeedbackEntity>

export class FeedbackEntity extends AbstractEntity implements EntityMethod {
  private static readonly service = new FeedbackService()

  public static statusMap = new Map<
    FeedbackEntity['status'],
    { type: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'; label: string }
  >([
    [0, { type: 'warning', label: '未处理' }],
    [1, { type: 'success', label: '已处理' }]
  ])

  public static form() {
    return new FeedbackQueryEntity()
  }

  public static select(data: EntityQuery<FeedbackQueryEntity & AppRequest.List>) {
    return FeedbackEntity.service.select(data)
  }

  public static process(id: number) {
    return FeedbackEntity.service.process(id)
  }

  status!: 0 | 1
  @Expose() id: number
  @Expose() name!: string
  @Expose() contact!: string
  @Expose() area!: string
  @Expose() message!: string

  constructor(id = 0) {
    super()
    this.id = id
    this.init()
  }

  process() {
    return FeedbackEntity.service.process(this.id)
  }
}
