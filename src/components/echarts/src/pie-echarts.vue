<template>
  <div class="pie-echarts">
    <base-echarts :options="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { BaseEcharts } from '@/base-ui/baseEcharts'
export default defineComponent({
  props: {
    optionData: {
      type: Array
    }
  },
  components: {
    BaseEcharts
  },
  setup(props) {
    // 饼图option 放在computed内变成响应式数据
    const option = computed(() => {
      return {
        // title: {
        //   text: 'Referer of a Website',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: props.optionData, // 把拿到的数据放在这里
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })

    return {
      option // 再把整个option传给base-echarts渲染
    }
  }
})
</script>

<style scoped lang="less">

</style>