<template>
  <div class="user">
    <!-- 二次封装pro-form 只需引入page-search组件即可 -->
    <page-search
      :formConfig="searchFormConfig"
      @resetForm="resetForm"
      @searchTable="searchTable"
    ></page-search>

    <!-- 二次封装pro-table 用户列表数据 传入pageName 获取user页面数据-->
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="users"
      ref="pageContentRef"
      @handleEdit="handleEdit"
      @newAdd="newAdd"
    ></page-content>

    <!-- 弹窗 -->
    <page-modal
      ref="modalRef"
      :formConfig="dialogFormConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { useStore } from 'vuex'
// import type { FormItem } from '@/base-ui/ProForm' // FormItem对象类型
import { PageSearch } from '@/components/page-search' // search组件
import { PageContent } from '@/components/page-content' // table组件
import { PageModal } from '@/components/page-modal' // 弹窗组件
import { searchFormConfig } from './config/search.config' // search配置文件
import { tableContentConfig } from './config/content.config' // table配置文件
import { dialogFormConfig } from './config/dialog.config'
import { usePageSearch } from '@/hooks/usePageSearch' // 导入hooks文件
import { usePageModal } from '@/hooks/usePageModal'
export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // ！！**网络层请求页面数据放到组件内获取，因为请求的接口相似，通过store设计一个判断获取不同页面的pageList
    // const store = useStore()
    // // 调用store内的action方法获取Page数据
    // store.dispatch('system/getPageListAction', {
    //   url: '/users/list',
    //   queryInfo: {
    //     //查询条件 offset：查询偏移量，0: 不偏移 10：查询11开始数据， 偏移量*pageSize
    //     offset: 0,
    //     size: 10
    //   }
    // })
    // // 从store拿用户列表数据
    // const listData = computed(() => {
    //   return store.state.system.userList
    // })

    // pro-form 绑定数据对象
    // const formData = ref({
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createdTime: ''
    // })
    // const labelWidth = '150px'

    /** 这部分代码封装到hooks内 */
    // 拿pageContent组件ref 调用内部方法
    // const pageContentRef = ref()
    // // 重置表单
    // const resetForm = () => {
    //   // 通过ref拿到组件的方法, 再发送请求重新获取数据
    //   pageContentRef.value?.getPageData()
    // }
    // // 搜索
    // const searchTable = (params: any = {}) => {
    //   pageContentRef.value?.getPageData(params)
    // }

    // 通用的表单查询和重置  封装到hook内
    const [pageContentRef, resetForm, searchTable] = usePageSearch()

    // // 获取子组件ref
    // const modalRef = ref()
    // //定义一个默认初始化值
    // const defaultInfo = ref({})

    // const handleEdit = (el: any) => {
    //   // console.log('点击了编辑按钮', el)
    //   defaultInfo.value = { ...el } //保存编辑对象时获取到的数据
    //   modalRef.value.centerDialogVisible = true
    // }

    // const newAdd = () => {
    //   defaultInfo.value = {}
    //   modalRef.value.centerDialogVisible = true
    // }

    // 新增弹窗显示密码，编辑弹窗隐藏密码 通过回调函数形式传给hook执行
    const AddCb = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      passwordItem!.isHidden = false
    }
    const editCb = () => {
      const passwordItem = dialogFormConfig.formItems.find((item) => {
        return item.field === 'password'
      })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      passwordItem!.isHidden = true
    }

    // 页面共享的逻辑都写到hook内  弹窗相关功能
    // eslint-disable-next-line prettier/prettier
    const [modalRef, defaultInfo, handleEdit, newAdd] = usePageModal(AddCb, editCb)

    return {
      // formData,
      // labelWidth,
      // formItems,
      // listData,
      searchFormConfig,
      tableContentConfig,
      dialogFormConfig,
      resetForm,
      searchTable,
      pageContentRef,
      handleEdit,
      newAdd,
      modalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less">
</style>