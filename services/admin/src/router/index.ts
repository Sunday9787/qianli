import { createRouter, createWebHistory } from 'vue-router'
import ErrorView from '@/views/error/index.vue'
import { dashboardRoute } from './modules/dashboard'
import { userRoute } from './modules/user'
import { postRoute } from './modules/post'
import { productRoute } from './modules/product'
import { systemRoute } from './modules/system'
import { feedbackRoute } from './modules/feedback'
import { jobRoute } from './modules/job'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'QianliRoot', meta: { hidden: true }, redirect: '/dashboard/workplace' },
    {
      path: '/login',
      name: 'QianliLogin',
      meta: { hidden: true, title: '登录' },
      props: route => ({ redirect: route.query.redirect }),
      component: () => import('@/views/login/index.vue')
    },
    dashboardRoute,
    postRoute,
    productRoute,
    feedbackRoute,
    userRoute,
    jobRoute,
    systemRoute,
    { path: '/403', name: 'Qianli403', meta: { hidden: true }, props: { status: 403 }, component: ErrorView },
    { path: '/404', name: 'Qianli404', meta: { hidden: true }, props: { status: 404 }, component: ErrorView },
    { path: '/:catchAll(.*)', redirect: '/404', meta: { hidden: true } }
  ]
})

export default router
