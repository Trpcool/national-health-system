<template>
  <viewLayout v-model="pager" @selectChange="handleSelectChange">
    <!-- 顶部查询区域 -->
    <template #query-form>
      <el-form inline>
        <el-form-item label="器械名称">
          <el-input v-model="queryForm.name" placeholder="请输入器械名称" />
        </el-form-item>
        <el-form-item label="器械厂商">
          <el-input
            v-model="queryForm.manufacturer"
            placeholder="请输入器械厂商"
          />
        </el-form-item>
        <el-form-item label="器械类别">
          <el-select
            v-model="queryForm.categoryIdList"
            multiple
            placeholder="请选择器械类别"
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            style="width: 400px"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.name"
              :value="item.categoryId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="resetPage">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <tableList :list="pager.list" />
  </viewLayout>
</template>

<script setup>
import { ref } from "vue";
import {
  getInstrumentListAPI,
  getInstrumentCategoryListAPI,
  deleteInstrumentAPI,
} from "@/network/instrument";
import usePagination from "@/hooks/usePagination";
import tableList from "./c-cmps/tableList.vue";

const queryForm = ref({
  name: "",
  manufacturer: "",
  categoryIdList: [],
});
const { pager, getList, resetPage } = usePagination({
  request: getInstrumentListAPI,
  params: queryForm,
});
getList();

const categoryList = ref([]);
const getCategoryList = async () => {
  const data = await getInstrumentCategoryListAPI();
  categoryList.value = data;
};
getCategoryList();
</script>

<style lang="less" scoped></style>
