<template>
  <div class="pro-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- 使用v-bind绑定响应式布局对象colLayout -->
          <el-col v-bind="colLayout">
            <!-- 绑定动态样式itemStyle -->
            <el-form-item :label="item.label" :style="itemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%">
                  <el-option v-for="option in item.options" :key="option.value">
                    {{ option.label }}</el-option
                  >
                </el-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <!-- 其他配置的绑定可直接使用v-bind -->
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { FormItem } from '../types'
export default defineComponent({
  props: {
    formItems: {
      // 把数组断言为PropType 传入一个定义好的泛型FormItem
      type: Array as PropType<FormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 30px' })
    },
    // 根据屏幕宽度响应式布局
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 12,
        xs: 12
      })
    }
  },
  setup() {
    

    return {}
  }
})
</script>

<style scoped lang="less">
.pro-form {
  padding-top: 20px;
}
</style>