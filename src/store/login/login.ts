// 导入vuex的Module类型
import { Module } from 'vuex'
import type { LoginState } from './types'
import type { RootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import router from '@/router'
import localCache from '@/utils/localCache'
// 引入映射路由的方法
import { mapMenusToRoutes } from '@/utils/mapRoutes'

// Module有2个必传泛型：1.模块类型, 2.根类型
export const login: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userinfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    setToken(state, token: string) {
      state.token = token
    },
    setUserInfo(state, userInfo: any) {
      state.userinfo = userInfo
    },
    setUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      /**动态路由重点*/
      // 1.在这个方法内调用映射路由方法, 传入userMenus
      const routes = mapMenusToRoutes(userMenus)
      console.log('映射路由', routes)
      // 2. 将routes动态添加到main->children下面
      routes.forEach((route) => {
        router.addRoute('Main', route)
      })
    }
  },
  actions: {
    // 处理登录请求，做3件事
    async accountLoginAction({ commit }, payload: any) {
      console.log('执行vuex-accountLoginAction登录', payload)
      // 1.实现登录逻辑，获取Token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('setToken', token)
      localCache.setCache('token', token)

      // 2.根据id获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('setUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.获取用户权限菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      // console.log(userMenusResult);
      const userMenus = userMenusResult.data
      commit('setUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4. 跳到首页
      router.push('/main')
    },

    // 用户刷新时,初始化store数据
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('setToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('setUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('setUserMenus', userMenus)
      }
    }
  }
}
