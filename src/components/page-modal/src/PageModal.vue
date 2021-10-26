<template>
  <div class="page-modal">
    <!-- 注意：destroy-on-close 关闭时销毁元素，下次打开才会重新加载监听后刷新的数据 -->
    <el-dialog
      v-model="centerDialogVisible"
      title="标题"
      width="30%"
      center
      destroy-on-close
    >
      <pro-form v-bind="formConfig" v-model="formData"></pro-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { ProForm } from '@/base-ui/ProForm'
export default defineComponent({
  components: {
    ProForm
  },
  props: {
    formConfig: {
      type: Object,
      default: () => ({})
    },
    defaultInfo: {
      type: Object,
      default: () => ({}) // 设置默认值是空对象，watch监听编辑时就会生效
    }
  },
  setup(props) {
    const formData = ref<any>({}) // 设置any类型 form.data[]才不会报错
    const centerDialogVisible = ref(false)

    // 监听传进来的defaultInfo, 改变时就给formData赋值
    watch(
      () => {
        return props.defaultInfo
      },
      (newValue) => {
        console.log('触发监听newValue:', newValue)
        for (const el of props.formConfig.formItems) {
          formData.value[el.field] = newValue[el.field]
        }
    })
    return {
      formData,
      centerDialogVisible
    }
  }
})
</script>

<style scoped>

</style>