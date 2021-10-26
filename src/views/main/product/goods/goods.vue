<template>
  <div class="goods">
    <page-content :tableContentConfig="tableContentConfig" pageName="goods">
      <!-- 重点：跨组件动态插槽 -->
      <template #image="scope">
        <el-image
          :src="scope.row.imgUrl"
          style="width: 100px; height: 100px"
          fit="fit"
        ></el-image>
      </template>
      <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
      <template #newPrice="scope">{{ '¥' + scope.row.newPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageContent } from '@/components/page-content'
import { tableContentConfig } from './config/content.config'
export default defineComponent({
  components: {
    PageContent
  },
  setup () {
    

    return {
      tableContentConfig
    }
  }
})
</script>

<style scoped>

</style>