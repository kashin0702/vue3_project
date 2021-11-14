<template>
  <div class="dashboard">
    <el-row class="row" :gutter="10">
      <el-col :span="7">
        <pro-card title="分类商品数量(饼图)">
          <!-- 把请求到的数据传给封装好的echarts组件 -->
          <pie-echarts :optionData="goodsCountOption"></pie-echarts>
        </pro-card>
      </el-col>
      <el-col :span="10">
        <pro-card title="各城市商品销量">
          
        </pro-card>
      </el-col>
      <el-col :span="7">
        <pro-card title="分类商品数量(玫瑰图)">

        </pro-card>
      </el-col>
    </el-row>
    <el-row class="row" :gutter="10">
      <el-col :span="12">
        <pro-card></pro-card>
      </el-col>
      <el-col :span="12">
        <pro-card></pro-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { ProCard } from '@/base-ui/ProCard'
// 根据要展示的数据类型，导入二次封装的echarts
import { PieEcharts } from '@/components/echarts/'
// import { BaseEcharts } from '@/base-ui/baseEcharts'
export default defineComponent({
  components: {
    ProCard,
    PieEcharts
    // BaseEcharts
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    // 注意这里要返回一个符合echarts格式的数组，所以用了map重新映射一个新数组 value/name
    console.log(store.state.dashboard.categoryGoodsCount)
    // 放在computed内保证vuex请求下来数据后，goodsCountOption会更新
    const goodsCountOption = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((el: any) => {
        return {
          value: el.goodsCount,
          name: el.name
        }
      })
    })
    console.log('goodsCountOption', goodsCountOption)
    const goodsFavorOption = computed(() => {
      return store.state.categoryGoodsFavor
    })
    return {
      goodsCountOption,
      goodsFavorOption
    }
  }
})
</script>

<style scoped>
.row {
  margin-bottom: 20px;
}
</style>