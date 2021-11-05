import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import { BASE_URL } from './service/request/config'
// 引入样式初始化css 通过npm安装
import 'normalize.css'
import './assets/css/index.less'

import { setupStore } from './store'
import { globalRegitser } from './global'

const app = createApp(App)

// 注册过滤方法 $filters
app.use(globalRegitser)

app.use(store)
/**
 * 页面每次初始化调用这个方法setupStore()
 * setupStore()必须放在use(router)前执行 否则刷新页面会跳到notFound
 **/
setupStore()
app.use(router)
app.use(ElementPlus)
app.mount('#app')
