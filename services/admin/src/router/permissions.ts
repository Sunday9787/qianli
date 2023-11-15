import router from '.'
import NProgress from 'nprogress'
import store from '@/store'
import { useUserModule } from '@/store/modules/user'
import 'nprogress/nprogress.css'

const whiteList: ReadonlyArray<string> = ['/login']

router.beforeEach(function (to, form, next) {
  NProgress.start()
  const userModule = useUserModule(store)

  if (userModule.token) {
    if (to.path === '/login') {
      next('/dashboard')
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) > -1) {
    next()
  } else {
    next('/login')
  }
})

router.beforeResolve(function (to, form, next) {
  NProgress.done()
  document.title = import.meta.env.VITE_APP_TITLE + '-' + to.meta.title
  next()
})
