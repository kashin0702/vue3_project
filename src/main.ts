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

// console.log('我是Baseurl111', BASE_URL)

// import ajax from './service'
// interface DataType {
//   data: any
//   returnCode: string
// }
// ajax
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log('单独请求的拦截', config)
//         return config
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//   })
const app = createApp(App)
app.use(store)

/**
 * 页面每次初始化调用这个方法setupStore()
 * 该方法必须放在use(router)前执行 否则刷新页面会跳到notFound
 **/
setupStore()
app.use(router)
app.use(ElementPlus)
app.mount('#app')

