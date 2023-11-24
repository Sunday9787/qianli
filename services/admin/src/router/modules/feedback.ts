import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { FeedbackOutlined } from '@vicons/material'

export const feedbackRoute: RouteRecordRaw = {
  path: '/feedback',
  name: 'QianliFeedback',
  component: Layout,
  redirect: '/feedback/list',
  meta: { title: '反馈管理', icon: FeedbackOutlined, noShowingChildren: true },
  children: [
    {
      path: 'list',
      name: 'QianliFeedbackList',
      meta: { activeMenu: '/feedback' },
      component: () => import('@/views/feedback/list/index.vue')
    }
  ]
}
