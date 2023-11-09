import { createRouter, createWebHistory } from 'vue-router'
import ErrorView from '@/views/error/index.vue'
import { dashboardRoute } from './modules/dashboard'
import { userRoute } from './modules/user'
import { postRoute } from './modules/post'
import { productRoute } from './modules/product'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'QianliLogin',
      component: () => import('@/views/login/index.vue')
    },
    dashboardRoute,
    userRoute,
    postRoute,
    productRoute,
    { path: '/403', name: 'Qianli403', meta: { hidden: true }, component: ErrorView, props: { status: 403 } },
    { path: '/404', name: 'Qianli404', meta: { hidden: true }, component: ErrorView, props: { status: 404 } },
    { path: '/:catchAll(.*)', redirect: '/404', meta: { hidden: true } }
  ]
})

export default router
