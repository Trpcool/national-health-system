<template>
  <el-card never="none">
    <template #header>数据趋势</template>
    <div id="bar-chart"></div>
  </el-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
let chart = null;
const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
};
const init = () => {
  chart = echarts.init(document.querySelector("#bar-chart"));
  chart.setOption(option);
};

const reSizeChart = () => {
  chart || chart.resize();
};
onMounted(() => {
  init();
  window.addEventListener("resize", reSizeChart);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", reSizeChart);
});
</script>

<style lang="less" scoped>
#bar-chart {
  height: 400px;
}
</style>
