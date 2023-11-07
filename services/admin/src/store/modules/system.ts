import { defineStore } from 'pinia'

export const systemModule = defineStore('userModule', {
  state() {
    return {
      sidebar: {
        collapse: false
      }
    }
  },
  actions: {
    TOGGLE_SIDEBAR() {
      this.sidebar.collapse = !this.sidebar.collapse
    }
  }
})
