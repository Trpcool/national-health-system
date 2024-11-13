<template>
  <div>
    <viewLayout v-model="pager">
      <!-- 顶部查询区域 -->
      <template #query-header>
        <p>query</p>
      </template>
      <!-- 批量按钮区域 -->
      <template #options>
        <el-button type="success">设置分类</el-button>
        <el-button type="danger">药品删除</el-button>
      </template>
      <!-- table区域 -->
      <template #table>
        <el-table-column prop="img" label="封装图">
          <template #default="scope">
            <pre-image
              width="100"
              height="100"
              :url="scope.row.img"
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="药品名称"></el-table-column>
        <el-table-column prop="categoryName" label="分类">
          <template #default="scope">
            <el-tag
              v-for="item in scope.row.categoryNameList"
              :key="item"
              style="margin: 2px"
              >{{ item.name }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="manufacturer" label="生产商"></el-table-column>
        <el-table-column
          prop="productionNum"
          label="生产编号"
        ></el-table-column>
        <el-table-column prop="specification" label="数量"></el-table-column>
        <el-table-column
          prop="unitPrice"
          label="价格"
          width="100"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              @click="handleDetail(row.medicinesId)"
              link
              >详情</el-button
            >
            <el-button type="info" @click="handleOpenEdit(row.medicinesId)" link
              >编辑</el-button
            >
            <el-button type="danger" @click="handleDel(row.medicinesId)" link
              >删除</el-button
            >
          </template>
        </el-table-column>
      </template>
    </viewLayout>
  </div>
</template>

<script setup>
import { ref } from "vue";
const pager = ref({
  currentPage: 1,
  pageSize: 15,
  pageSizes: [15, 30, 50, 100],
  total: 100,
});
</script>

<style lang="less" scoped></style>
