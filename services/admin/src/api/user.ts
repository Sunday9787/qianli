import { AbstractService } from '@/class/abstractService'
import { request } from '@/utils/request'

export class UserDTO {
  username!: string
  password!: string
}

export class UserResponseDTO {
  token!: string
  username!: string
  avatar!: string
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
