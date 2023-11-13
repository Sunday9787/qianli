import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export class UserDTO {
  email!: string
  password!: string
}

export class UserResponseDTO {
  token!: string
  username!: string
  email!: string
  avatar!: string
}

export interface QueryUserList extends AppRequest.List {
  username?: string
  email?: string
  created_start?: number
  created_end?: number
}

export interface ResultUserList {
  id: number
  email: string
  username: string
  avatar: string
  created: Date
  updated: Date
}

export function userList(data: QueryUserList) {
  return request.post<AppResponse.List<ResultUserList>>('/user/list', data)
}

class UserService extends AbstractService {
  public readonly baseURL = '/user'

  public logIn(data: UserDTO) {
    return request.post<UserResponseDTO>(`${this.baseURL}/login`, data)
  }

  public logOut() {
    return request.post(`${this.baseURL}/logout`)
  }
}

export const userService = new UserService()
