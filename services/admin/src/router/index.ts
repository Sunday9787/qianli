import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'QianliLogin',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/dashboard',
      name: 'QianliDashboard',
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
})

export default router
