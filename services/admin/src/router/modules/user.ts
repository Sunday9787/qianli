import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { SupervisedUserCircleRound } from '@vicons/material'

export const userRoute: RouteRecordRaw = {
  path: '/user',
  name: 'QianliUser',
  component: Layout,
  redirect: '/user/list',
  meta: { title: '用户管理', icon: SupervisedUserCircleRound, noShowingChildren: true },
  children: [
    {
      path: 'list',
      name: 'QianliUserList',
      meta: { activeMenu: '/user', title: '用户列表' },
      component: () => import('@/views/user/list/index.vue')
    }
  ]
}
