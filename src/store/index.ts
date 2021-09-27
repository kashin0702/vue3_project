import { createStore } from 'vuex'
import { login } from './login/login'
import type { RootState } from './types'

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
export default store
