import { LoginState } from './login/types'
import { SystemState } from './main/system/types'
import { DashBoardState } from './main/analysis/types'
export interface RootState {
  name: string
  password: number
  allDepartmentList: any[]
  allRoleList: any[]
  menuTree: any[]
}

// vuex各个模块的类型
export interface RootWithModule {
  // 登录模块
  login: LoginState
  system: SystemState
  dashboard: DashBoardState
}

// 交叉类型
export type StoreType = RootState & RootWithModule
