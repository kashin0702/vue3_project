<template>
  <div class="page-modal">
    <el-dialog v-model="centerDialogVisible" title="标题" width="30%" center>
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
import { defineComponent, ref } from 'vue'
import { ProForm } from '@/base-ui/ProForm'
export default defineComponent({
  components: {
    ProForm
  },
  props: {
    formConfig: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const formData = ref({})
    const centerDialogVisible = ref(false)

    return {
      formData,
      centerDialogVisible
    }
  }
})
</script>

<style scoped>

</style>