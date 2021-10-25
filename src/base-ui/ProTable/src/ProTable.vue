<template>
  <div class="pro-table">
    <!-- table中data数据跟table-column的prop值绑定 -->
    <!-- selection-change: 当column有select列，且选中时触发 -->
    <div class="header">
      <slot name="header">
        <div class="header">{{ title }}</div>
        <div class="btns">
          <slot name="headerBtns"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- select列 -->
      <el-table-column
        type="selection"
        align="center"
        width="60"
        v-if="isShowSelect"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
        v-if="isShowIndex"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.name">
        <el-table-column
          align="center"
          :prop="propItem.prop"
          :label="propItem.label"
          :min-width="propItem.minWidth"
        >
          <!-- 1.把所有要显示的列都写在作用域插槽内 -->
          <!-- 2.利用slotName 动态绑定所有slot插槽 -->
          <template #default="scope">
            <!-- 利用插槽prop 把row数据传出去给父组件 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          :page-size="pageInfo.pageSize"
          :current-page="pageInfo.currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array as PropType<any[]>,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    isShowSelect: {
      type: Boolean,
      default: false
    },
    isShowIndex: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    dataCount: {
      type: Number,
      default: 0
    },
    // 父组件传过来的v-model双向绑定数据
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ['handleSelectionChange', 'update:pageInfo'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      console.log(value)
      // 把事件发出去给父组件调用 value是选中列的数组
      emit('handleSelectionChange', value)
    }
    // 分页改变事件 触发双向绑定update事件 并把修改的值传出去
    const handleSizeChange = (pageSize: number) => {
      emit('update:pageInfo', { ...props.pageInfo, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:pageInfo', { ...props.pageInfo, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>
.pro-table {
  padding: 20px;
  margin-top: 20px;
}
</style>
