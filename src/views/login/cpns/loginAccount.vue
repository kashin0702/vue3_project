<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <!-- rules根据prop的属性获取对应规则 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
// 导入工具函数
import localCache from '@/utils/localCache'
// 导入store
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    // 定义store 写在最外层
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const rules = {
      name: [
        // eslint-disable-next-line prettier/prettier
        { required: true,
          message: '请输入用户户名',
          trigger: 'blur' 
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5-10位的字母或数字',
          trigger: 'blur'
        }
      ],
      password: [
        // eslint-disable-next-line prettier/prettier
        { required: true, 
          message: '请输入密码', 
          trigger: 'blur' 
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '密码必须是3位以上的数字或字母',
          tirgger: 'blur'
        }
      ]
    }
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 把记住密码当做参数传入
    const loginAction = (isKeepPwd: boolean) => {
      // console.log('我是子组件处理登录逻辑')
      // 调用ElForm组件对象的validate方法进行验证
      formRef.value?.validate((valid) => {
        if (valid) {
          console.log('验证通过, 执行登录逻辑')
          // 1.是否记住密码
          if (isKeepPwd) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.执行登录操作
          // 调用login模块内的accoutLoginAction方法执行登录，并传入account对象
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
