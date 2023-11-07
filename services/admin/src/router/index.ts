import { createRouter, createWebHistory } from 'vue-router'
import { dashboardRoute } from './modules/dashboard'
import { userRoute } from './modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'QianliLogin',
      component: () => import('@/views/login/index.vue')
    },
    dashboardRoute,
    userRoute
  ]
})

export default router
