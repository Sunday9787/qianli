/// <reference types="vite/client" />
/// <reference types="vue-router" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_ENV: 'development' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import type { VNodeChild } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string
    /** 是否隐藏 */
    hidden?: boolean
    /** 是否不显示 子路由 */
    noShowingChildren?: boolean
    /** 活动菜单 */
    activeMenu?: string
    icon?(): VNodeChild
  }
}
