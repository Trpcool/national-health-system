<template>
  <el-card style="width: 480px" never="none">
    <template #header>统计占比</template>
    <div id="e-charts1"></div>
  </el-card>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const option = {
  title: {
    text: "科室患者占比",
    left: "left",
  },
  tooltip: {
    trigger: "item",
    // 禁止字体放大
    formatter: "{b}:{c}%(患者占比)",
  },
  // 图例
  legend: {
    orient: "vertical",
    right: -1,
    top: 0,
  },
  label: {
    show: true,
    position: "center",
    labelLineLength: 0,
    formatter: function (params) {
      return params.name + ":" + params.value + "%";
    },
  },
  series: [
    {
      name: "占比",
      type: "pie",
      radius: ["10%", "60%"],
      itemStyle: {
        borderRadius: 6,
        borderColor: "#fff",
        borderWidth: 1,
      },
      data: [
        { value: 10, name: "内科" },
        { value: 20, name: "外科" },
        { value: 20, name: "神经科" },
        { value: 30, name: "骨科" },
        { value: 20, name: "其他" },
      ],
    },
  ],
};
// 初始化图表
const init = () => {
  const echart1 = echarts.init(document.querySelector("#e-charts1"));
  echart1.setOption(option);
};

onMounted(init);
</script>

<style lang="less" scoped>
#e-charts1 {
  height: 450px;
}
</style>
