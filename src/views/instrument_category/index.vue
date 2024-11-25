<template>
  <div class="medicine-content">
    <el-card shadow="never" style="width: auto">
      <TableList
        :list="pager.list"
        :loading="pager.loading"
        @refresh="getList"
      />
      <pagination v-model="pager" />
    </el-card>
  </div>
</template>

<script setup>
import usePagination from "@/hooks/usePagination";
import { getCategoryListAPI } from "@/network/instrument_category";
import TableList from "./c-cmps/tableList.vue";

const { pager, getList, resetPage } = usePagination({
  request: getCategoryListAPI,
});
getList();
</script>

<style lang="less" scoped>
.medicine-content {
  position: relative;
  width: 100%;
}
</style>
