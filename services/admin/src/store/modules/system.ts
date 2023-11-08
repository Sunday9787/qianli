import { defineStore } from 'pinia'

export const useSystemModule = defineStore('systemModule', {
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
