import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 给这个接口定义一个默认泛型T = AxiosResponse
export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  //这个类型定义为泛型
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
// 继承类型并进行扩展
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
  showLoading?: boolean
}
