import { ref } from 'vue'

export function usePageModal(): any {
  // 获取子组件ref
  const modalRef = ref()
  //定义一个默认初始化值
  const defaultInfo = ref({})

  const handleEdit = (el: any) => {
    // console.log('点击了编辑按钮', el)
    defaultInfo.value = { ...el } //保存编辑对象时获取到的数据
    modalRef.value.centerDialogVisible = true
  }

  const newAdd = () => {
    defaultInfo.value = {}
    modalRef.value.centerDialogVisible = true
  }

  return [modalRef, defaultInfo, handleEdit, newAdd]
}
