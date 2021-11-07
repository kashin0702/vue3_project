import { ref } from 'vue'
type CbFn = (item?: any) => void //定义回调函数类型 有一个可选参数

export function usePageModal(addCb?: CbFn, editCb?: CbFn): any {
  // 获取子组件ref
  const modalRef = ref()
  //定义一个默认初始化值
  const defaultInfo = ref({})

  const handleEdit = (el: any) => {
    // console.log('点击了编辑按钮', el)
    defaultInfo.value = { ...el } //保存编辑对象时获取到的数据
    modalRef.value.centerDialogVisible = true
    editCb && editCb(defaultInfo.value) // 把当前点击对象传给回调函数
  }

  const newAdd = () => {
    defaultInfo.value = {}
    modalRef.value.centerDialogVisible = true
    addCb && addCb()
  }

  return [modalRef, defaultInfo, handleEdit, newAdd]
}
