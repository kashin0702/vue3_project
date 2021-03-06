<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" />
      <span class="title" v-if="!collapse">Vue3+TS</span>
    </div>
    <el-menu
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :default-active="defaultActive"
    >
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
              <!-- 监听路由点击goUrl  菜单的index绑定id-->
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
import { defineComponent, computed, ref } from 'vue'
// 这里用的useStore是自己封装的，保证类型正确
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { pathToMenu } from '@/utils/mapRoutes'
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

    // 刷新时保存之前点击的菜单
    // 思路：拿到当前页面的路径，和useMenus进行比对
    // 当userMenus.url === path时 返回这个menu 即是当前的页面
    const route = useRoute()
    const currentPath = route.path
    // 根据入参currentPath 拿到对应的id
    const menu = pathToMenu(userMenus.value, currentPath)
    // 拿到id, 给default-active绑定激活页效果
    const defaultActive = ref(menu.id + '')

    // 路由跳转
    const goUrl = (item: any) => {
      console.log(item)
      router.push({
        path: item.url
      })
    }
    return {
      userMenus,
      // 点击的菜单id
      defaultActive,
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