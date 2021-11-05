import { Module } from 'vuex'
import type { SystemState } from './types'
import type { RootState } from '../../types'
import {
  getPageListData,
  deletePageData,
  addNewPageData,
  editPageData
} from '@/service/main/system/system'
import { ElMessageBox, ElMessage } from 'element-plus'
// 系统管理内的子模块数据(用户管理，角色管理等)都放在System父模块内
export const system: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    // 用户列表
    setUserList(state, list) {
      state.usersList = list
    },
    setUserCount(state, count) {
      state.usersCount = count
    },
    // 角色列表
    setRoleList(state, list) {
      state.roleList = list
    },
    setRoleCount(state, count) {
      state.roleCount = count
    },
    // 商品列表
    setGoodsList(state, list) {
      state.goodsList = list
    },
    setGoodsCount(state, count) {
      state.goodsCount = count
    },
    // 菜单列表
    setMenuList(state, list) {
      state.menuList = list
    },
    setMenuCount(state, count) {
      state.menuCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取传进来的pageName 设置不同的pageUrl参数
      const pageName = payload.pageName
      let pageUrl = ''
      // 重点:根据传进来的pageName 设置不同的请求url 实现一个方法请求不同页面的page数据
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }
      // 2.发起数据请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log('页面数据', pageResult)
      // 3.将数据存储到state中
      switch (pageName) {
        case 'users':
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
        case 'menu':
          commit('setMenuList', pageResult.data.list)
          commit('setMenuCount', pageResult.data.totalCount)
      }
    },
    // 删除数据
    async deleteListDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      ElMessageBox.confirm('确认要删除此用户?', '删除提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await deletePageData(pageName, id)
          // 删除成功后刷新页面
          dispatch('getPageListAction', {
            pageName,
            queryInfo: {
              offset: 0,
              size: 10
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 新增数据
    async addPageDataAction({ dispatch }, payload: any) {
      // 1.发送请求新增数据
      const { pageName, newdata } = payload
      const pageUrl = `/${pageName}`
      await addNewPageData(pageUrl, newdata)
      // 2. 刷新页面
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑数据
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, id, editdata } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editdata)
      // 刷新页面
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
