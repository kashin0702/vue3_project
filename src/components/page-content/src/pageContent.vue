<template>
  <div class="content">
    <pro-table :listData="dataList" v-bind="tableContentConfig">
      <!-- 自定义表头按钮 -->
      <template #headerBtns>
        <el-button icon="el-icon-plus" size="medium" type="primary"
          >新增</el-button
        >
      </template>
      <!-- 定义enable为自定义渲染列，并通过作用域插槽拿到scope.row数据 -->
      <template #enable="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <!-- 使用注册的$filters将utc时间格式化为本地时间 -->
        <strong>{{ $filters.formatUTCTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatUTCTime(scope.row.updateAt) }}</strong>
      </template>
      <template #buttons>
        <el-button icon="el-icon-edit" size="mini" type="text">编辑</el-button>
        <el-button icon="el-icon-delete" size="mini" type="text">删除</el-button>
      </template>
    </pro-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { ProTable } from '@/base-ui/ProTable'
export default defineComponent({
  components: {
    ProTable
  },
  props: {
    tableContentConfig: {
      type: Object,
      required: true
    },
    // 关键属性pageName 用来获取不同页面的pageList
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName, //把pageName传给请求方法
      queryInfo: { offset: 0, size: 10 }
    })
    // 传入pageName 用getters动态拿数据
    // 注意要把依赖数据放在computed内才会有数据，响应式数据
    const dataList = computed(() =>
      store.getters['system/pageDataGetter'](props.pageName)
    )
    console.log('dataList:', dataList)
    return {
      dataList
    }
  }
})
</script>

<style scoped>

</style>