<template>
  <div
  >
    <header-statistic :data="data.header" />
    <body-status-chart/>
    <div class="echarts-container">
      <ratio-charts />
      <curve-charts style="flex: 1" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElLoading } from "element-plus";
import HeaderStatistic from "./c-cmps/headerStatistic.vue";
import RatioCharts from "./c-cmps/charts/ratioCharts.vue";
import CurveCharts from "./c-cmps/charts/curveCharts.vue";
import BodyStatusChart from "./c-cmps/patientChart/index.vue";
const data = ref({
  header: {
    out: 0,
    outInput: 0,
    total: 0,
    register: 0,
  },
  bar: {
    bar1: [
      {
        value: 335,
        name: "直接访问",
      },
      {
        value: 234,
        name: "联盟广告",
      },
      {
        value: 158,
        name: "搜索引擎",
      },
    ],
    bar2: [
      {
        value: 125,
        name: "直接访问",
      },
      {
        value: 400,
        name: "联盟广告",
      },
      {
        value: 213,
        name: "搜索引擎",
      },
    ],
  },
  series: [
    {
      name: "Forest",
      type: "bar",
      barGap: 0,
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390],
    },
    {
      name: "Steppe",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290],
    },
    {
      name: "Desert",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190],
    },
    {
      name: "Wetland",
      type: "bar",
      emphasis: {
        focus: "series",
      },
      data: [98, 77, 101, 99, 40],
    },
  ],
});

let loadingInstance1;
onMounted(() => {
  // loadingInstance1 = ElLoading.service({
  //   fullscreen: true,
  //   background: "rgba(0, 0, 0, 0.7)",
  //   text: "数据统计中...",
  // });
  setTimeout(() => {
    data.value = {
      header: {
        out: 100,
        outInput: 200,
        total: 300,
        register: 400,
      },
    };
    // loadingInstance1.close();
  }, 2000);
});
</script>

<style lang="less" scoped>
.echarts-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>
