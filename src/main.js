import '@/styles/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import vueRouter from '@/plugins/vueRouter'
import vueStore from '@/plugins/vueStore'
import '@/plugins/vant'
import 'dayjs/locale/zh-cn'
import webviewCommunicate from '@/plugins/webviewCommunicate/webviewCommunicate'

import VConsole from 'vconsole'

// new VConsole()

const app = createApp(App)
app.use(createPinia())
vueRouter(app)
vueStore(app)
webviewCommunicate(app)

app.mount('#app')

export default app
