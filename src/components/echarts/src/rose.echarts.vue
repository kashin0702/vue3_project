<template>
  <div class="rose-echarts">
    <base-echarts :options="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseEcharts } from '@/base-ui/baseEcharts'
export default defineComponent({
  components: {
    BaseEcharts
  },
  setup() {
    // 玫瑰图option
    const option = {
      legend: {
        top: 'bottom'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
            { value: 22, name: 'rose 7' },
            { value: 18, name: 'rose 8' }
          ]
        }
      ]
    }

    return {
      option
    }
  }
})
</script>

<style scoped lang="less">

</style>