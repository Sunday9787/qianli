import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

import type { AuthLoginEntityJSON, AuthLoginEntityResult } from './auth.entity'

export class AuthService extends AbstractService {
  readonly baseURL = '/auth'

  logIn(data: AuthLoginEntityJSON) {
    return request.post<AuthLoginEntityResult>(this.baseURL + '/login', data)
  }

  logOut() {
    return request.post(this.baseURL + '/logout')
  }
}
