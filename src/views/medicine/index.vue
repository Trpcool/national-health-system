<template>
  <div class="medicine-content">
    <el-card
      style="margin-bottom: 10px; position: sticky; top: 0px; z-index: 99"
    >
      <el-form :inline="true" style="display: flex">
        <el-form-item label="药品名称:">
          <el-input
            placeholder="请输入药品名称"
            v-model="queryForm.medicineName"
          ></el-input>
        </el-form-item>
        <el-form-item label="药品分类:">
          <el-select
            v-model="queryForm.idList"
            multiple
            placeholder="请选择药品类别"
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            style="width: 400px"
          >
            <el-option
              v-for="item in medicalCategoryList"
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
    </el-card>
    <el-card >
      <TableList :list="pager.list" :loading="pager.loading" />
      <pagination v-model="pager" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import usePagination from "@/hooks/usePagination";
import { getMedicineList, getMedicineCategoryList } from "@/network/medicine";
import TableList from "./c-cmps/tableList.vue";

const medicalCategoryList = ref([]);

const initCategoryList = async () => {
  const res = await getMedicineCategoryList();
  medicalCategoryList.value = res;
};
initCategoryList();

const queryForm = ref({
  idList: [],
  medicineName: "",
});

const { pager, getList, resetPage } = usePagination({
  request: getMedicineList,
  params: queryForm,
});
getList();
</script>

<style lang="less" scoped>
.medicine-content {
  position: relative;
  width: 100%;
}
</style>
