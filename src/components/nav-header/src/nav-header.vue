<template>
  <div class="nav-header">
    <!-- 左侧 展开收拢按钮 -->
    <div class="fold" @click="handleFoldChange">
      <!-- ref对象会自动解包 所以不用写isFold.value -->
      <el-icon v-if="!isFold">
        <d-arrow-left />
      </el-icon>
      <el-icon v-else>
        <d-arrow-right />
      </el-icon>
    </div>
    <!-- 面包屑 & 用户头像 -->
    <div class="content">
      <pro-breadcrumb :breadcrumbs="breadcrumbs"></pro-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { DArrowLeft } from '@element-plus/icons'
import { DArrowRight } from '@element-plus/icons'
import userInfo from './user-info.vue'
import { ProBreadcrumb } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
// 路径转化为面包屑数组的方法
import { pathToBreadcrumb } from '@/utils/mapRoutes'
export default defineComponent({
  components: {
    DArrowLeft,
    DArrowRight,
    userInfo,
    ProBreadcrumb
  },
  // 发送自定义事件出去
  emits: ['foldChange'],
  setup(props, { emit }) {
    let isFold = ref(false)
    const handleFoldChange = () => {
      // console.log('fold值', isFold)
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const store = useStore()
    // const route = useRoute()
    // const userMenus = store.state.login.userMenus
    // const currentPath = route.path
    // const breadcrumbs = pathToBreadcrumb(userMenus, currentPath)
    
    // 面包屑相关依赖数据都放入计算属性中 变成响应式对象
    const breadcrumbs = computed(() => {
      const route = useRoute()
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathToBreadcrumb(userMenus, currentPath)
    })
    // console.log('面包屑', breadcrumbs)
    return {
      breadcrumbs,
      isFold,
      handleFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .fold {
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
}
</style>