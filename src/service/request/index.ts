import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { RequestConfig, RequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
// 导入loading的类型
import type { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'
// 通过类来封装请求接口，因为类具有更好的封装性
class Http {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  // 扩展config类型RequestConfig
  constructor(config: RequestConfig) {
    //构造创建实例的方法，通过axios.create方法创建，并传入config
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true

    // 实例自己的拦截器
    // 类封装的接口可以创建多个实例->new Http() 每个实例都可以配置自己的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 根据传入的showLoading字段动态配置是否显示加载动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0,0,0,0.3)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 请求失败也将loading移除
        this.loading?.close()
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }
  // 封装请求方法
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独请求拦截器处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否要显示Loading
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance
        // 这个request是instance实例的方法 不要搞混
        .request<any, T>(config)
        .then((res) => {
          // 单独请求的响应拦截判断
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
          // 请求完成后再设置回true 防止下一次请求showLoading没了
          this.showLoading = true
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default Http
