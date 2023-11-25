import type { FeedbackQueryEntity, FeedbackEntityJSON } from './feedback.entity'
import type { EntityQuery } from '@/class/abstractEntity'
import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export class FeedbackService extends AbstractService {
  readonly baseURL = '/contact'

  select(data: EntityQuery<FeedbackQueryEntity & AppRequest.List>) {
    return request.post<AppResponse.List<FeedbackEntityJSON>>(this.baseURL + '/feedback/list', data)
  }

  process(id: number) {
    return request.post(this.baseURL + `/feedback/process/${id}`)
  }
}
