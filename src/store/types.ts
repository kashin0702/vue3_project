import { LoginState } from './login/types'
import { SystemState } from './main/system/types'

export interface RootState {
  name: string
  password: number
}

// vuex各个模块的类型
export interface RootWithModule {
  // 登录模块
  login: LoginState
  systemModule: SystemState
}

// 交叉类型
export type StoreType = RootState & RootWithModule
