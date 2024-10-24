<template>
  <el-card style="margin-bottom: 10px">
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
  <el-card>
    <el-table :data="pager.list" v-loading="pager.loading" table-layout="fixed">
      <el-table-column prop="img" label="封装图">
        <template #default="scope">
          <img
            :src="scope.row.img"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="药品名称"></el-table-column>
      <el-table-column prop="categoryName" label="分类">
        <template #default="scope">
          <el-tag
            v-for="item in scope.row.categoryName
              .split(' ')
              .filter((item) => item != '')"
            :key="item"
            style="margin: 2px"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="manufacturer" label="生产商"></el-table-column>
      <el-table-column prop="productionNum" label="生产编号"></el-table-column>
      <el-table-column prop="specification" label="数量"></el-table-column>
      <el-table-column prop="unitPrice" label="价格"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link>详情</el-button>
          <el-button type="info" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <pagination v-model="pager" />
    </div>
  </el-card>
</template>

<script setup>
import usePagination from "@/hooks/usePagination";
import { getMedicineList, getMedicineCategoryList } from "@/network/medicine";
import { ref } from "vue";

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
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>
