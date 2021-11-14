<template>
  <div class="role">
    <!-- 二次封装pro-form 只需引入page-search组件即可 -->
    <!-- <page-search :searchFormConfig="searchFormConfig"></page-search> -->

    <!-- 二次封装pro-table 用户列表数据 传入pageName 获取user页面数据-->
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="role"
      @handleEdit="handleEdit"
      @newAdd="newAdd"
    ></page-content>

    <page-modal
      ref="modalRef"
      :formConfig="dialogConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <!-- slot插入树形组件 -->
      <template #default>
        <el-tree
          :data="menuTree"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="TreeCheck"
          ref="treeRef"
        >
        </el-tree>
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { PageSearch } from '@/components/page-search' // search组件
import { PageContent } from '@/components/page-content' // content组件
import { PageModal } from '@/components/page-modal'
import { usePageModal } from '@/hooks/usePageModal'
import { dialogConfig } from './config/dialog.config'
// import { searchFormConfig } from './config/search.config' // search配置文件
import { tableContentConfig } from './config/content.config' // table配置文件
import { useStore } from 'vuex'

import { reduceTreetoLeaf } from '@/utils/mapRoutes'
export default defineComponent({
  components: {
    // PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()

    // 引用tree组件，调用里面的方法回显树菜单
    const treeRef = ref()

    // 创建一个回调函数作为参数传给usePageModal 用来接收点击编辑按钮的得到的item数据
    const editFn = (item: any) => {
      console.log('我是role页面点击的编辑对象', item)
      // 用递归创建一个叶子节点的id数组 传给tree方法回显选中的节点
      const checkedLeafs = reduceTreetoLeaf(item.menuList)
      // 弹窗方法内，包裹nextTick, 表示在treeRef绑定后执行
      nextTick(() => {
        // ！注意：在editFn事件里直接调用treeRef时，弹框时ref还没绑定到组件上，treeRef.value等于undefined 必须包裹nextTick
        console.log('我是treeValue', treeRef.value)
        treeRef.value.setCheckedKeys(checkedLeafs, false) // 只设置叶子节点，父节点自动显示全选或半选状态
      })
    }
    const [modalRef, defaultInfo, handleEdit, newAdd] = usePageModal(undefined, editFn)
    // 获取全部树形菜单
    const menuTree = computed(() => store.state.menuTree)

    // 传给dialog组件的树形菜单数据
    const otherInfo = ref({})
    // tree点击复选框回调事件 接收2个参数
    const TreeCheck = (data1: any, data2: any) => {
      console.log('当前点击的节点', data1)
      console.log('树当前选中对象的key,node, 半选中对象key,node', data2)
      // 拼接选中节点id和半选中节点Id
      const selectTreeList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
      // 把tree数组传给otherInfo
      otherInfo.value = { menuList: selectTreeList }
    }
    return {
      // searchFormConfig,
      tableContentConfig,
      dialogConfig,
      modalRef,
      defaultInfo,
      handleEdit,
      newAdd,
      menuTree,
      TreeCheck,
      otherInfo,
      treeRef
    }
  }
})
</script>

<style scoped lang="less"></style>
