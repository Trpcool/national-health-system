<template>
  <el-card shadow="never" style="width: 100%;">
    <TableList :list="pager.list" :loading="pager.loading" @refresh="getList" />
    <pagination v-model="pager" />
  </el-card>
</template>

<script setup>
import usePagination from "@/hooks/usePagination";
import { getCategoryListAPI } from "@/network/medicine_category";
import TableList from "./c-cmps/tableList.vue";

const { pager, getList, resetPage } = usePagination({
  request: getCategoryListAPI,
});
getList();
</script>

<style lang="less" scoped>
.medicine-content {
  position: relative;
  width: auto;
}
</style>
