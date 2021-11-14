import * as echarts from 'echarts'

export function useEcharts(domEl: HTMLElement): any {
  const echartsInstance = echarts.init(domEl)

  const setOptions = (option: any) => {
    echartsInstance.setOption(option)
  }
  // 监听页面尺寸改变时，echarts动态伸缩 这个方法写在hooks内公用
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  // 同时导出一个setResize方法，在页面某些组件发生宽度改变时，可以调用
  const setResize = () => {
    echartsInstance.resize()
  }
  return {
    echartsInstance,
    setOptions,
    setResize
  }
}
