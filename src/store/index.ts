// 给useStore起一个别名useVuexStore 防止命名冲突
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { login } from './login/login'
import type { RootState, StoreType } from './types'

const store = createStore<RootState>({
  state() {
    return {
      name: '',
      password: Number()
    }
  },
  mutations: {},
  actions: {},
  // 导入模块
  modules: {
    login
  }
})

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
