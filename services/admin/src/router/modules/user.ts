import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const userRoute: RouteRecordRaw = {
  path: '/user',
  name: 'QianliUser',
  component: Layout,
  redirect: '/user/list',
  meta: { title: '用户管理', noShowingChildren: true },
  children: [
    {
      path: 'list',
      name: 'QianliUserList',
      meta: { activeMenu: '/user' },
      component: () => import('@/views/user/list/index.vue')
    }
  ]
}
