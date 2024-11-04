<template>
  <el-table :data="props.list" v-loading="props.loading" table-layout="fixed">
    <el-table-column prop="img" label="封装图">
      <template #default="scope">
        <pre-image :url="scope.row.img" fit="contain" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="药品名称"></el-table-column>
    <el-table-column prop="categoryName" label="分类">
      <template #default="scope">
        <el-tag
          v-for="item in scope.row.categoryNameList"
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
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less" scoped>
::v-deep .el-table__cell {
  z-index: auto /*初始化z-index层叠上下文（z-index:0），防止与盒子内部的z-index属性的盒子层级有冲突*/
}
</style>
