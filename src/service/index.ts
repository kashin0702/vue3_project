// service统一出口
import localCache from '@/utils/localCache'
import Http from './request'
import { BASE_URL } from './request/config'

const ajax = new Http({
  baseURL: BASE_URL,
  // 实例自己的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 所有请求添加token
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default ajax
