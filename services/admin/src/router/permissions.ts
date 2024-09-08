import 'nprogress/nprogress.css'

import NProgress from 'nprogress'

import store from '@/store'
import { useUserModule } from '@/store/modules/user'

import router from '.'

const whiteList: ReadonlyArray<string> = ['/login']

router.beforeEach(function (to, _form, next) {
  NProgress.start()
  const userModule = useUserModule(store)

  if (userModule.access_token) {
    if (to.path === '/login') {
      next('/dashboard')
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) > -1) {
    next()
  } else {
    next({ path: '/login', query: { redirect: _form.fullPath } })
  }
})

router.beforeResolve(function (to, form, next) {
  NProgress.done()
  document.title = import.meta.env.VITE_APP_TITLE + '-' + to.meta.title
  next()
})
