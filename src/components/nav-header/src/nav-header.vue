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
      <div>面包屑</div>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DArrowLeft } from '@element-plus/icons'
import { DArrowRight } from '@element-plus/icons'
import userInfo from './user-info.vue'
export default defineComponent({
  components: {
    DArrowLeft,
    DArrowRight,
    userInfo
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

    return {
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