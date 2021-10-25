// setup函数内钩子文件
import { ref } from 'vue'
import { PageContent } from '@/components/page-content'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function usePageSearch() {
  // 拿pageContent组件ref 调用内部方法
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  // 重置表单 也发送请求
  const resetForm = () => {
    // 通过ref拿到组件的方法, 再发送请求重新获取数据
    pageContentRef.value?.getPageData()
  }
  // 搜索功能
  const searchTable = (params: any = {}) => {
    pageContentRef.value?.getPageData(params)
  }

  // 通过一个元组类型把数据暴露出去 (元组:已知个数和元素类型的数组)
  return [pageContentRef, resetForm, searchTable]
}
