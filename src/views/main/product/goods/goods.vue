<template>
  <div class="goods">
    <page-content :tableContentConfig="tableContentConfig"></page-content>
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