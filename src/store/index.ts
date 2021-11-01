// 给useStore起一个别名useVuexStore 防止命名冲突
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { login } from './login/login'
import { system } from './main/system/system'
import type { RootState, StoreType } from './types'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<RootState>({
  state() {
    return {
      name: '',
      password: Number(),
      // 下拉框部门、角色列表数据 保存在根rootstore中
      allDepartmentList: [],
      allRoleList: []
    }
  },
  mutations: {
    setAllDepartmentList(state, list) {
      state.allDepartmentList = list
    },
    setAllRoleList(state, list) {
      state.allRoleList = list
    }
  },
  actions: {
    // 请求下拉框的部门和角色数据
    async getInitList({ commit }) {
      const departmentListResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const roleListResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })

      // 重命名list 并保存到state
      const { list: departmentList } = departmentListResult.data
      const { list: roleList } = roleListResult.data
      commit('setAllDepartmentList', departmentList)
      commit('setAllRoleList', roleList)
    }
  },
  // 导入模块
  modules: {
    login,
    system
  }
})

// 页面初始化时调用的方法
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 因为vuex和typescript兼容性很差
// 自己封装一个useStore()方法
export function useStore(): Store<StoreType> {
  // 实际返回就是useStore方法
  return useVuexStore()
}
export default store
