<template>
  <div>
    <div class="search">
      <pro-form :formItems="formItems" :labelWidth="labelWidth"></pro-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ProForm, FormItem } from '@/base-ui/ProForm'
export default defineComponent({
  components: {
    ProForm
  },
  setup() {
    const formItems: FormItem[] = [
      {
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名'
      },
      {
        type: 'password',
        label: '密码',
        placeholder: '请输入密码'
      },
      {
        type: 'select',
        label: '喜欢的运动',
        placeholder: '请选择喜欢的运动',
        options: [
          { label: '篮球', value: 1 },
          { label: '足球', value: 2 }
        ]
      },
      {
        type: 'datepicker',
        label: '创建时间',
        placeholder: '请选择创建时间',
        otherOptions: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange'
        }
      }
    ]
    const labelWidth = '150px'
    return {
      formItems,
      labelWidth
    }
  }
})
</script>

<style scoped lang="less">
</style>