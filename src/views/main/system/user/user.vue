<template>
  <div class="user">
    <!-- 原 未封装代码 -->
    <!-- <div class="search">
      <pro-form
        :formItems="formItems"
        :labelWidth="labelWidth"
        v-model="formData"
      >
        <template #footer>
          <div class="search-btns">
            <el-button icon="el-icon-delete">重置</el-button>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </div>
        </template>
      </pro-form>
    </div> -->

    <!-- 二次封装pro-form 只需引入page-search组件即可 -->
    <page-search :searchFormConfig="searchFormConfig"></page-search>

    <!-- 二次封装pro-table 用户列表数据 传入pageName 获取user页面数据-->
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="user"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useStore } from 'vuex'
// import type { FormItem } from '@/base-ui/ProForm' // FormItem对象类型
import { PageSearch } from '@/components/page-search' // search组件
import { PageContent } from '@/components/page-content' // content组件
import { searchFormConfig } from './config/search.config' // search配置文件
import { tableContentConfig } from './config/content.config' // table配置文件
export default defineComponent({
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    // ！！**网络层请求数据放到组件内获取，通过store设计一个判断获取不同页面的pageList
    // const store = useStore()
    // // 调用store内的action方法获取Page数据
    // store.dispatch('system/getPageListAction', {
    //   url: '/users/list',
    //   queryInfo: {
    //     //查询条件 offset：查询偏移量，0表示第一页 1表示第二页
    //     offset: 0,
    //     size: 10
    //   }
    // })
    // // 从store拿用户列表数据
    // const listData = computed(() => {
    //   return store.state.system.userList
    // })

    // pro-form 绑定数据对象
    // const formData = ref({
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createdTime: ''
    // })
    // const labelWidth = '150px'
    return {
      // formData,
      // labelWidth,
      // formItems,
      // listData,
      searchFormConfig,
      tableContentConfig
    }
  }
})
</script>

<style scoped lang="less">
</style>