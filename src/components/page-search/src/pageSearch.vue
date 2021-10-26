<template>
  <div class="page-search">
    <pro-form v-bind="formConfig" v-model="formData">
      <template #footer>
        <div class="search-btns">
          <el-button icon="el-icon-delete" @click="resetForm">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="searchTable">搜索</el-button>
        </div>
      </template>
    </pro-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ProForm } from '@/base-ui/ProForm'
export default defineComponent({
  components: {
    ProForm
  },
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetForm', 'searchTable'],
  setup(props, { emit }) {
    // 双向绑定的数据字段不能写死 因为每个页面查询字段不同
    // const formData = ref({
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createdTime: ''
    // })
    // 根据传入的config获取input字段
    const formItems = props.formConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = '' // 新建一个拥有所有field字段属性的form对象
    }
    // 再把该对象传到ref内配置成响应式传给formData
    const formData = ref(formOriginData)

    // 重置表单 对引用值修改不是重新赋值 才能修改组件内部的浅拷贝对象props.modelValue
    const resetForm = () => {
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
      emit('resetForm') // 发送重置事件给父组件user.vue
    }
    // 搜索表单
    const searchTable = () => {
      emit('searchTable', formData.value) // 发送搜索事件，搜索参数给父组件user.vue
    }
    return {
      formData,
      resetForm,
      searchTable
    }
  }
})
</script>

<style scoped>
.search-btns {
  text-align: right;
  padding: 0 20px 20px 0;
}
</style>
