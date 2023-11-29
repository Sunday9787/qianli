import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { DashboardRound } from '@vicons/material'

export const dashboardRoute: RouteRecordRaw = {
  path: '/dashboard',
  name: 'QianliDashboard',
  component: Layout,
  redirect: '/dashboard/workplace',
  meta: { title: '工作台', icon: DashboardRound, noShowingChildren: true },
  children: [
    {
      path: 'workplace',
      name: 'QianliDashboardWorkplace',
      meta: { activeMenu: '/' },
      component: () => import('@/views/dashboard/workplace/index.vue')
    }
  ]
}
