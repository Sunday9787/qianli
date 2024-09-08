import { defineStore } from 'pinia'

import { AuthEntity, type AuthLoginEntityJSON, AuthLoginEntityResult } from '@/service/auth.entity'

export const useUserModule = defineStore('userModule', {
  state() {
    return AuthEntity.toJSON(new AuthLoginEntityResult())
  },
  actions: {
    async logIn(form: AuthLoginEntityJSON) {
      const response = await AuthEntity.logIn(form)
      this.id = response.id
      this.access_token = response.access_token
      this.refresh_token = response.refresh_token
      this.email = response.email
      this.username = response.username
      this.avatar = response.avatar
    },
    async logOut() {
      await AuthEntity.logOut()
      this.$reset()
    }
  },
  persist: true
})
