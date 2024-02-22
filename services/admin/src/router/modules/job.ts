import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { WorkOutlineOutlined } from '@vicons/material'

export const jobRoute: RouteRecordRaw = {
  path: '/job',
  name: 'QianliJob',
  component: Layout,
  redirect: '/job/list',
  meta: { title: '招聘管理', icon: WorkOutlineOutlined, noShowingChildren: true },
  children: [
    {
      path: 'list',
      name: 'QianliJobList',
      meta: { activeMenu: '/job', title: '招聘列表' },
      component: () => import(/* webpackChunkName: "job_list" */ '@/views/job/list/index.vue')
    }
  ]
}
