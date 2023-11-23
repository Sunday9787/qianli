import { defineStore } from 'pinia'
import { emitter } from '@/utils/eventBus'
import { globalChannel } from '@/utils/constant'

interface State {
  sidebar: {
    collapse: boolean
  }

  theme: {
    mode: ThemeMode
  }
}

export type ThemeMode = 'light' | 'dark'

export const useSystemModule = defineStore('systemModule', {
  state() {
    return {
      sidebar: {
        collapse: false
      },
      theme: {
        mode: 'light'
      }
    } as State
  },
  getters: {
    isLightTheme: state => state.theme.mode === 'light'
  },
  actions: {
    TOGGLE_SIDEBAR() {
      this.sidebar.collapse = !this.sidebar.collapse
    },
    CHANGE_THEME(mode: ThemeMode) {
      this.theme.mode = mode
      emitter.emit(globalChannel.systemThemeChange)
    },
    TOGGLE_THEME() {
      this.theme.mode = this.theme.mode === 'light' ? 'dark' : 'light'
    }
  },
  persist: {
    paths: ['sidebar', 'theme'],
    afterRestore() {
      requestAnimationFrame(function () {
        emitter.emit(globalChannel.systemThemeChange)
      })
    }
  }
})
