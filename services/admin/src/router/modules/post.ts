import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { PostAddFilled } from '@vicons/material'

export const postRoute: RouteRecordRaw = {
  path: '/post',
  name: 'QianliPost',
  component: Layout,
  redirect: '/post/list',
  meta: { title: '文章管理', icon: PostAddFilled, noShowingChildren: true },
  children: [
    {
      path: 'list',
      name: 'QianliPostList',
      meta: { activeMenu: '/post' },
      component: () => import('@/views/post/list/index.vue')
    }
  ]
}
