/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ajax from '../index'
import type { Account, LoginResult, DataType } from './types'

// 用枚举类型定义接口路径
enum LoginAPI {
  accountLogin = '/login',
  loginUserInfo = '/users/',
  userMenus = '/role/'
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// 登录请求 获取token
export function accountLoginRequest(account: Account) {
  //  调用时定义请求返回的类型
  return ajax.post<DataType<LoginResult>>({
    url: LoginAPI.accountLogin,
    data: account,
    showLoading: true
  })
}

// 根据id请求用户信息
export function requestUserInfoById(id: number) {
  return ajax.get<DataType>({
    url: LoginAPI.loginUserInfo + id,
    showLoading: false
  })
}

// 根据roleId请求菜单列表
export function requestUserMenusByRoleId(roleId: number) {
  return ajax.get<DataType>({
    url: LoginAPI.userMenus + roleId + '/menu',
    showLoading: false
  })
}
