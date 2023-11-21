import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { ConfirmationNumberFilled } from '@vicons/material'

export const systemRoute: RouteRecordRaw = {
  path: '/system',
  name: 'QianliSystem',
  component: Layout,
  redirect: '/system/index',
  meta: { title: '系统管理', icon: ConfirmationNumberFilled, noShowingChildren: true },
  children: [
    {
      path: 'index',
      name: 'QianliSystemIndex',
      meta: { activeMenu: '/system' },
      component: () => import('@/views/system/index.vue')
    }
  ]
}
