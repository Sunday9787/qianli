import { createApp } from 'vue'
import Components from './components'
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'
import store from './store'
import './router/permissions'

import './styles/index.less'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Components)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
