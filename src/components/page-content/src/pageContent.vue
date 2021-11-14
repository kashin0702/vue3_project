<template>
  <div class="content">
    <!-- v-model默认绑定名字modelValue 可以用v-model:xxx重命名 -->
    <pro-table
      :listData="listData"
      v-bind="tableContentConfig"
      :dataCount="dataCount"
      v-model:pageInfo="pageInfo"
    >
      <!-- 自定义表头按钮 isCreate绑定新增权限 -->
      <template #headerBtns>
        <el-button
          v-if="isCreate"
          icon="el-icon-plus"
          size="medium"
          type="primary"
          @click="newAdd"
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
      <template #buttons="scope">
        <!-- 给按钮绑定权限 -->
        <el-button
          v-if="isUpdate"
          icon="el-icon-edit"
          size="mini"
          type="text"
          @click="handleEdit(scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="isDelete"
          icon="el-icon-delete"
          size="mini"
          type="text"
          @click="handleDelete(scope.row)"
          >删除</el-button
        >
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
import { usePermissions } from '@/hooks/usePermissions' //获取权限钩子函数
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
  emits: ['handleEdit', 'newAdd'],
  setup(props, { emit }) {
    const store = useStore()
    // store.dispatch('system/getPageListAction', {
    //   pageName: props.pageName, //把pageName传给请求方法
    //   queryInfo: { offset: 0, size: 10 }
    // })
    // 获取该页面的增删改查按钮权限
    const isQuery = usePermissions(props.pageName, 'query')
    const isCreate = usePermissions(props.pageName, 'create')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isDelete = usePermissions(props.pageName, 'delete')

    // pagination分页绑定数据
    const pageInfo = ref({
      pageSize: 10,
      currentPage: 1
    })
    // 监听分页改变事件 update:pageInfo 触发getPageData刷新页面
    watch(pageInfo, (newVal) => {
      console.log('pageInfo新值', newVal)
      getPageData()
    })

    // 用函数封装请求，供外部ref调用
    const getPageData = (params: any = {}) => {
      if (!isQuery) return //如果没有查询权限，直接返回
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
    // 注意要把依赖数据放在computed内才会是响应式数据
    const listData = computed(() =>
      store.getters['system/pageDataGetter'](props.pageName)
    )
    console.log('listData:', listData)

    // 获取数据条数 放入pagination
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 通过传入的配置文件,过滤获取其他非公有的动态插槽名称
    const otherPropSlots = props.tableContentConfig?.propList.filter(
      (el: any) => {
        if (el.slotName === 'createAt') return false
        if (el.slotName === 'updateAt') return false
        if (el.slotName === 'enable') return false
        if (el.slotName === 'buttons') return false
        return true
      }
    )

    // 编辑/删除 按钮操作 统一通过store层执行请求
    const handleDelete = (el: any) => {
      store.dispatch('system/deleteListDataAction', {
        pageName: props.pageName,
        id: el.id
      })
    }
    // 点击编辑 发送自定义事件给父组件，显示弹窗
    const handleEdit = (el: any) => {
      emit('handleEdit', el)
    }
    // 新增弹窗
    const newAdd = () => {
      emit('newAdd')
    }
    return {
      listData,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDelete,
      handleEdit,
      newAdd
    }
  }
})
</script>

<style scoped></style>
