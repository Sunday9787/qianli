import { createApp } from 'vue'
import NaiveUi from 'naive-ui'

import App from './App.vue'
import router from './router'
import store from './store'
import './router/permissions'

import './styles/index.less'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(NaiveUi)

app.mount('#app')
