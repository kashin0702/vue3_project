<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" />
      <span class="title" v-if="!collapse">Vue3+TS</span>
    </div>
    <el-menu :collapse="collapse">
      <template v-for="item in userMenus" :key="item.id">
        <!-- type === 1 表示有二级菜单 -->
        <template v-if="item.type === 1">
          <!-- index绑定唯一标识 用于选中展开收拢效果 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <!-- 监听路由点击goUrl -->
              <el-menu-item :index="subitem.id + ''" @click="goUrl(subitem)">
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 只有一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
// 这里用的useStore是自己封装的，保证类型正确
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const userMenus = computed(() => {
      return store.state.login.userMenus
    })

    const goUrl = (item: any) => {
      console.log(item)
      router.push({
        path: item.url
      })
    }
    return {
      userMenus,
      goUrl
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  img {
    height: 100%;
    padding-right: 10px;
  }
}
.title {
  font-size: 16px;
  color: white;
  font-weight: 700;
}
</style>