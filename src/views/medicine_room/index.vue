<template>
  <viewLayout v-model="pager">
    <template #query-form>
      <el-form :inline="true" style="display: flex">
        <el-form-item label="药房名称">
          <el-input
            placeholder="请输入药房名称"
            v-model="queryForm.pharmacyName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="resetPage">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <tableList :list="pager.list" :loading="pager.loading" @refresh="getList" />
  </viewLayout>
</template>

<script setup>
import { ref } from "vue";
import usePagination from "@/hooks/usePagination";
import { getMedicineRoomListAPI } from "@/network/medicine_room";
import tableList from "./c-cmps/tableList.vue";

const queryForm = ref({
  pharmacyName: "",
});

const { getList, pager, resetPage } = usePagination({
  request: getMedicineRoomListAPI,
  params: queryForm,
});
getList();
</script>

<style lang="less" scoped></style>
