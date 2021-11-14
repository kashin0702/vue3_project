import { Module } from 'vuex'
import type { RootState } from '../../types'
import type { DashBoardState } from './types'
import {
  getCatgoryGoodsCount,
  getCatgoryGoodsFavor,
  getCatgoryGoodsSale,
  getAddressSale
} from '@/service/main/analysis/dashboard'
export const dashboard: Module<DashBoardState, RootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    setGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    setGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    setGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    setAddress(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const { data: goodsCountList } = await getCatgoryGoodsCount()
      const { data: goodsFavorList } = await getCatgoryGoodsFavor()
      const { data: goodsSaleList } = await getCatgoryGoodsSale()
      const { data: addressSaleList } = await getAddressSale()
      commit('setGoodsCount', goodsCountList)
      commit('setGoodsFavor', goodsFavorList)
      commit('setGoodsSale', goodsSaleList)
      commit('setAddress', addressSaleList)
    }
  }
}
