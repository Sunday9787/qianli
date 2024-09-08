import type { EntityQuery } from '@/class/abstractEntity'
import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

import type { UserEntityJSON, UserQueryEntity } from './user.entity'

export class UserService extends AbstractService {
  readonly baseURL = '/user'

  del(id: number) {
    return request.delete(this.baseURL + `/del/${id}`)
  }

  select(data: EntityQuery<UserQueryEntity> & AppRequest.List) {
    return request.post<AppResponse.List<UserEntityJSON>>(this.baseURL + '/list', data)
  }

  save(data: UserEntityJSON) {
    return request.put(this.baseURL + '/save', data)
  }
}
