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
        >
        </el-tree>
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { PageSearch } from '@/components/page-search' // search组件
import { PageContent } from '@/components/page-content' // content组件
import { PageModal } from '@/components/page-modal'
import { usePageModal } from '@/hooks/usePageModal'
import { dialogConfig } from './config/dialog.config'
// import { searchFormConfig } from './config/search.config' // search配置文件
import { tableContentConfig } from './config/content.config' // table配置文件
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    // PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()
    const [modalRef, defaultInfo, handleEdit, newAdd] = usePageModal()
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
      otherInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
