<template>
  <el-card class="index" shadow="never">
    <header-statistic />
    <charts />
  </el-card>
</template>

<script setup>
import { onMounted } from "vue";
import { ElLoading } from "element-plus";
import headerStatistic from "./c-cmps/headerStatistic.vue";
import charts from "./c-cmps/charts/index.vue";

let loadingInstance1;

onMounted(() => {
  loadingInstance1 = ElLoading.service({ fullscreen: true,background: "rgba(0, 0, 0, 0.7)",text: "数据统计" });
  setTimeout(() => {
    loadingInstance1.close();
  }, 2000);
});
</script>

<style lang="less" scoped></style>
