<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- stretch：平分tab-pane v-model绑定el-tab-pane的name属性-->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i>账号登录</span>
        </template>
        <!-- 用户名输入框组件 -->
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i>手机登录</span>
        </template>
        <!-- 手机号输入框组件 -->
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPwd">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="account-login">
      <el-button type="primary" @click="handlerLoginClick">立即登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './loginAccount.vue'
export default defineComponent({
  components: {
    loginAccount
  },
  setup() {
    // 设置默认tab
    let currentTab = ref('account')
    // 记住密码
    let isKeepPwd = ref(false)
    // 固定语法 定义对象实例的类型
    const accountRef = ref<InstanceType<typeof loginAccount>>()

    const handlerLoginClick = () => {
      //accountRef就是account-login整个组件对象本身，包含了组件所有属性和方法
      console.log(accountRef.value)
      // 判断是用户名登录还是手机登录
      if (currentTab.value === 'account') {
        // 把登录事件的逻辑交给子组件处理
        accountRef.value?.loginAction(isKeepPwd.value)
      } else {
        // 手机登录逻辑
      }
    }
    return {
      currentTab,
      isKeepPwd,
      accountRef,
      handlerLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
  }
  .account-login {
    .el-button {
      width: 100%;
    }
  }
}
</style>