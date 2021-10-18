<template>
  <div class="role">
    <!-- 二次封装pro-form 只需引入page-search组件即可 -->
    <!-- <page-search :searchFormConfig="searchFormConfig"></page-search> -->

    <!-- 二次封装pro-table 用户列表数据 传入pageName 获取user页面数据-->
    <page-content
      :tableContentConfig="tableContentConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageSearch } from '@/components/page-search' // search组件
import { PageContent } from '@/components/page-content' // content组件
// import { searchFormConfig } from './config/search.config' // search配置文件
import { tableContentConfig } from './config/content.config' // table配置文件
export default defineComponent({
  components: {
    // PageSearch,
    PageContent
  },
  setup() {

    return {
      // searchFormConfig,
      tableContentConfig
    }
  }
})
</script>

<style scoped lang="less">
</style>