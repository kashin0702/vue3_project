import { Module } from 'vuex'
import type { SystemState } from './types'
import type { RootState } from '../../types'
import { getPageListData } from '@/service/main/system/system'

// 系统管理内的子模块数据(用户管理，角色管理等)都放在System父模块内
export const system: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0
    }
  },
  getters: {
    // 传pageName 获取对应的state数据
    pageDataGetter(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    // 保存用户列表
    setUserList(state, list) {
      state.userList = list
    },
    setUserCount(state, count) {
      state.userCount = count
    },
    // 角色列表
    setRoleList(state, list) {
      state.roleList = list
    },
    setRoleCount(state, count) {
      state.roleCount = count
    },
    setGoodsList(state, list) {
      state.goodsList = list
    },
    setGoodsCount(state, count) {
      state.goodsCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取传进来的pageName 设置不同的pageUrl参数
      const pageName = payload.pageName
      let pageUrl = ''
      // 重点:根据传进来的pageName 设置不同的请求url 实现一个方法请求不同页面的page数据
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
      }
      // 2.发起数据请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log('页面数据', pageResult)
      // 3.将数据存储到state中
      switch (pageName) {
        case 'user':
          commit('setUserList', pageResult.data.list)
          commit('setUserCount', pageResult.data.totalCount)
          break
        case 'role':
          commit('setRoleList', pageResult.data.list)
          commit('setRoleCount', pageResult.data.totalCount)
          break
        case 'goods':
          commit('setGoodsList', pageResult.data.list)
          commit('setGoodsCount', pageResult.data.totalCount)
          break
      }
    }
  }
}