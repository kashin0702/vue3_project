<template>
  <div class="page-modal">
    <!-- 注意：el-dialog包裹的是pro-form组件 用destroy-on-close关闭时销毁元素，下次打开才会重新加载监听后刷新的数据 -->
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
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { ProForm } from '@/base-ui/ProForm'
import { useStore } from 'vuex'
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
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const formData = ref<any>({}) // 设置any类型 form.data[]才不会报错
    const centerDialogVisible = ref(false)
    const store = useStore()
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
      }
    )

    // 确认提交按钮
    const confirm = () => {
      centerDialogVisible.value = false
      // 根据defaultInfo是否有值，判断是新增数据还是编辑数据请求
      if (Object.keys(props.defaultInfo).length) {
        // 编辑数据
        console.log('editdata', formData.value)
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editdata: { ...formData.value },
          id: props.defaultInfo.id
        })
      } else {
        // 新增数据
        store.dispatch('system/addPageDataAction', {
          pageName: props.pageName,
          newdata: { ...formData.value }
        })
      }
    }
    return {
      formData,
      confirm,
      centerDialogVisible
    }
  }
})
</script>

<style scoped></style>
