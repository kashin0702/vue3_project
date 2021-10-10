<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 动态绑定宽度 -->
      <el-aside :width="isCollapse ? '60px' : '220px'">
        <!-- menu也要这个属性 -->
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <!-- 接收子组件发来的宽度改变事件 -->
          <nav-header @foldChange="foldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-view">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { navMenu } from '@/components/nav-menu'
import { navHeader } from '@/components/nav-header'
export default defineComponent({
  name: 'Main',
  components: {
    navMenu,
    navHeader
  },
  setup() {
    const isCollapse = ref(false)

    // 自定义事件foldChange
    const foldChange = (isFold: boolean) => {
      // console.log('我是接收的fold', isFold)
      isCollapse.value = isFold
    }
    return {
      foldChange,
      isCollapse
    }
  }
})
</script>

<style scoped lang="less">
.page-view {
  background-color: #fff;
}
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
  background-color: rgb(223, 223, 223);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-clip: #f0f2f5;
}
</style>