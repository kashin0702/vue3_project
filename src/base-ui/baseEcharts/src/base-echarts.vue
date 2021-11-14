<template>
  <div class="base-echarts">
    <!-- echarts绑定的dom一定要设置宽高 -->
    <div ref="echartsDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue'
import { useEcharts } from '../hooks/useEcharts'
export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const echartsDivRef = ref<HTMLElement>()
    onMounted(() => {
      // const echartsInstance = echarts.init(echartsDivRef.value!)
      // echartsInstance.setOption(props.options)

      // 使用钩子函数useEcharts
      const { setOptions } = useEcharts(echartsDivRef.value!)
      // !重要逻辑: watcheffect监听options改变 刷新页面
      watchEffect(() => {
        // 只需要执行setOptions回调函数, 传入options即可
        setOptions(props.options)
      })
    })
    return {
      echartsDivRef
    }
  }
})
</script>

<style scoped>

</style>