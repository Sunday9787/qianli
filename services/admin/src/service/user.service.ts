import type { UserQueryEntity, UserAuthEntityResult, UserEntityJSON, UserAuthEntityJSON } from './user.entity'
import type { EntityQuery } from '@/class/abstractEntity'
import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export class UserService extends AbstractService {
  readonly baseURL = '/user'

  select(data: EntityQuery<UserQueryEntity> & AppRequest.List) {
    return request.post<AppResponse.List<UserEntityJSON>>(this.baseURL + '/list', data)
  }

  logIn(data: UserAuthEntityJSON) {
    return request.post<UserAuthEntityResult>(this.baseURL + '/login', data)
  }

  logOut() {
    return request.post(this.baseURL + '/logout')
  }
}
