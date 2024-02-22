/// <reference types="vite/client" />
import type { Component, DefineComponent } from 'vue'

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_BASE_API: string
    readonly VITE_APP_RESOURCE_DOMAIN: string
    readonly VITE_APP_ENV: 'development' | 'production'
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string
    /** 是否隐藏 */
    hidden?: boolean
    /** 不显示 子路由 */
    noShowingChildren?: boolean
    /** 活动菜单 */
    activeMenu?: string
    icon?: DefineComponent | Component
  }
}
