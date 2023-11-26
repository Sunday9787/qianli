import type { JobEntityJSON, JobQueryEntity } from './job.entity'
import type { EntityQuery } from '@/class/abstractEntity'
import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export class JobService extends AbstractService {
  baseURL = '/job'

  select(data: EntityQuery<JobQueryEntity & AppRequest.List>) {
    return request.post<AppResponse.List<JobEntityJSON>>(this.baseURL + '/list', data)
  }

  save(data: JobEntityJSON) {
    return request.put(this.baseURL + '/save', data)
  }

  del(id: number) {
    return request.delete(this.baseURL + `/${id}`)
  }
}
