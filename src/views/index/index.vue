<template>
    <div>
        大屏首页
        {{ pager }}
        <pagination v-model="pager"/>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const pager = ref({
  currentPage: 2,
  pageSize: 15,
  pageSizes: [15, 30, 50, 100],
  total: 10000,
})
  
</script>

<style lang="less" scoped>

</style>