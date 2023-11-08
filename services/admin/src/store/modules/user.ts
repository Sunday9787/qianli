import { defineStore } from 'pinia'
import { UserDTO, userService, UserResponseDTO } from '@/api/user'

export const useUserModule = defineStore('userModule', {
  state() {
    return {
      username: '',
      avatar: '',
      token: ''
    } as UserResponseDTO
  },
  actions: {
    async logIn(data: UserDTO) {
      const response = await userService.logIn(data)
      this.token = response.token
      this.username = response.username
      this.avatar = response.avatar
    },
    async logOut() {
      await userService.logOut()
      this.$reset()
    }
  },
  persist: true
})
