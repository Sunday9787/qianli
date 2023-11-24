import { AbstractService } from '@/class/abstractService'
import type { EntityQuery } from '@/class/abstractDTO'
import type { FeedbackQueryEntity, FeedbackEntity } from '@/views/feedback/entity'
import { request } from '@/utils/request'

export class FeedbackService extends AbstractService {
  readonly baseURL = '/contact'

  select(data: EntityQuery<FeedbackQueryEntity & AppRequest.List>) {
    return request.post<AppResponse.List<FeedbackEntity>>(this.baseURL + '/feedback/list', data)
  }

  process(id: number) {
    return request.post(this.baseURL + `/feedback/process/${id}`)
  }
}
