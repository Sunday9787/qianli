import { defineStore } from 'pinia'
import { UserDTO, UserResponseDTO, userService } from '@/api/user'

export const useUserModule = defineStore('userModule', {
  state() {
    return {
      username: '',
      password: '',
      token: ''
    } as UserResponseDTO
  },
  actions: {
    async logIn(data: UserDTO) {
      const response = await userService.logIn(data)
      this.token = response.token
      this.username = response.username
      this.password = response.password
    },
    logOut() {
      return userService.logOut()
    }
  }
})
