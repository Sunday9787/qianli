import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { DashboardRound } from '@vicons/material'

export const dashboardRoute: RouteRecordRaw = {
  path: '/',
  name: 'QianliHome',
  component: Layout,
  redirect: '/dashboard',
  meta: { title: '工作台', icon: DashboardRound, noShowingChildren: true },
  children: [
    {
      path: 'dashboard',
      name: 'QianliDashboard',
      meta: { activeMenu: '/' },
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
}
