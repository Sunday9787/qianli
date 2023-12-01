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
      meta: { activeMenu: '/post', title: '文章列表' },
      component: () => import('@/views/post/list/index.vue')
    },
    {
      path: 'detail/:id(\\d+)',
      name: 'QianliPostDetail',
      meta: { title: '文章详情' },
      props: route => ({ id: Number(route.params.id) }),
      component: () => import('@/views/post/detail/index.vue')
    },
    {
      path: 'action',
      name: 'QianliPostAction',
      meta: { title: '文章编辑' },
      props: route => ({ id: Number(route.query.id) || 0, type: route.query.type }),
      component: () => import('@/views/post/action/index.vue')
    }
  ]
}
