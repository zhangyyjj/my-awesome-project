import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementPlus from 'element-plus'
//重置样式
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/theme-chalk/el-loading.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/styles/reset.scss'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
