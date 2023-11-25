import { UserAuthEntity, UserAuthEntityResult } from '@/service/user.entity'
import { defineStore } from 'pinia'

export const useUserModule = defineStore('userModule', {
  state() {
    return UserAuthEntity.toJSON(new UserAuthEntityResult())
  },
  actions: {
    async logIn(user: UserAuthEntity) {
      const response = await user.logIn()
      this.id = response.id
      this.token = response.token
      this.email = response.email
      this.username = response.username
      this.avatar = response.avatar
    },
    async logOut() {
      await UserAuthEntity.logOut()
      this.$reset()
    }
  },
  persist: true
})
