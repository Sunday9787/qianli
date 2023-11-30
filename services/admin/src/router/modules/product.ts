import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { ProductionQuantityLimitsFilled } from '@vicons/material'

export const productRoute: RouteRecordRaw = {
  path: '/product',
  name: 'QianliProduct',
  component: Layout,
  redirect: '/product/list',
  meta: { title: '产品管理', icon: ProductionQuantityLimitsFilled, noShowingChildren: true },
  children: [
    {
      path: 'list',
      name: 'QianliProductList',
      meta: { activeMenu: '/product', title: '产品列表' },
      component: () => import('@/views/product/list/index.vue')
    },
    {
      path: 'detail/:id(\\d+)',
      name: 'QianliProductDetail',
      meta: { title: '产品详情' },
      props: route => ({ id: Number(route.params.id) }),
      component: () => import('@/views/product/detail/index.vue')
    },
    {
      path: 'action',
      name: 'QianliProductAction',
      meta: { title: '产品编辑' },
      props: route => ({ id: Number(route.query.id), type: route.query.type }),
      component: () => import('@/views/product/action/index.vue')
    }
  ]
}
