<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- 插入头像 -->
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="exitLogin">
            退出登录
          </el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import localCache from '@/utils/localCache'
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const name = computed(() => {
      return store.state.login.userinfo.name
    })
    const exitLogin = () => {
      localCache.deleteCache('token')
      router.push('/main')  //跳转到首页 路由守卫判断没有token就会跳回登录页
    }
    return {
      name,
      exitLogin
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
