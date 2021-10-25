<template>
  <div class="content">
    <!-- v-model默认绑定名字modelValue 可以用v-model:xxx重命名 -->
    <pro-table
      :listData="listData"
      v-bind="tableContentConfig"
      :dataCount="dataCount"
      v-model:pageInfo="pageInfo"
    >
      <!-- 自定义表头按钮 -->
      <template #headerBtns>
        <el-button icon="el-icon-plus" size="medium" type="primary"
          >新增</el-button
        >
      </template>
      <!-- 定义enable为动态通用插槽，并通过作用域插槽拿到scope.row数据 -->
      <template #enable="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <!-- createAt updateAt也定义为动态通用插槽 -->
      <template #createAt="scope">
        <!-- 使用全局注册的$filters将utc时间格式化为本地时间 -->
        <strong>{{ $filters.formatUTCTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatUTCTime(scope.row.updateAt) }}</strong>
      </template>
      <template #buttons>
        <el-button icon="el-icon-edit" size="mini" type="text">编辑</el-button>
        <el-button icon="el-icon-delete" size="mini" type="text">删除</el-button>
      </template>

      <!--难点： 动态插入剩余的非通用插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </pro-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
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
    // store.dispatch('system/getPageListAction', {
    //   pageName: props.pageName, //把pageName传给请求方法
    //   queryInfo: { offset: 0, size: 10 }
    // })

    // pagination分页绑定数据
    const pageInfo = ref({
      pageSize: 10,
      currentPage: 1
    })
    // 监听分页改变事件 update:pageInfo 触发getPageData刷新页面
    watch(pageInfo, () => {
      getPageData()
    })

    // 用函数封装请求，供外部ref调用
    const getPageData = (params: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName, //把pageName传给请求方法
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize, // 查询偏移量 currentPage * pageSize
          size: pageInfo.value.pageSize,
          ...params
        }
      })
    }
    // setup函数和create一样，每次页面初始化只会执行一次
    // 执行该方法请求数据
    getPageData()

    // 传入pageName 用getters动态拿数据
    // 注意要把依赖数据放在computed内才会有数据，响应式数据
    const listData = computed(() =>
      store.getters['system/pageDataGetter'](props.pageName)
    )
    console.log('listData:', listData)

    // 获取数据条数
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 通过传入的配置文件,过滤获取其他非公有的动态插槽名称
    const otherPropSlots = props.tableContentConfig?.propList.filter((el: any) => {
        if (el.slotName === 'createAt') return false
        if (el.slotName === 'updateAt') return false
        if (el.slotName === 'enable') return false
        if (el.slotName === 'buttons') return false
        return true
      }
    )
    return {
      listData,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots
    }
  }
})
</script>

<style scoped>

</style>