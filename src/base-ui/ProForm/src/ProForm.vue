<template>
  <div class="pro-form">
    <!-- 扩展插槽 头部 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- 使用v-bind绑定响应式布局对象colLayout -->
          <el-col v-bind="colLayout">
            <!-- 绑定动态样式itemStyle -->
            <el-form-item
              :label="item.label"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  ></el-option>
                </el-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <!-- 可直接使用v-bind 绑定整个对象 -->
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 扩展插槽 底部 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
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
    },
    // 使用v-model传过来的数据就是modelValue
    modelValue: {
      type: Object,
      required: true
    }
  },
  // 注意update:xx 中间不能有空格
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 解构传过来的对象生成一个拷贝对象，对父元素数据无影响
    const formData = ref({ ...props.modelValue })
    // 监听传入的对象，并将新值发送给父组件，实现单向数据流
    watch(
      formData,
      (newValue) => {
        console.log('子组件formData监听', newValue)
        emit('update:modelValue', newValue)
      },
      {
        deep: true //因为监听的是一个对象，要开启深度监听
      }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.pro-form {
  padding-top: 20px;
}
</style>