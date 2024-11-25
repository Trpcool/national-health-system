<template>
  <el-card never="none">
    <div id="body-chart"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
// import bodySvg from "@/assets/body_svg/body.svg";
let chart = null;
const option = {
  tooltip: {},
  geo: {
    left: 10,
    right: "50%",
    map: "organ_diagram",
    selectedMode: "multiple",
    emphasis: {
      focus: "self",
      itemStyle: {
        color: null,
      },
      label: {
        position: "bottom",
        distance: 0,
        textBorderColor: "#fff",
        textBorderWidth: 2,
      },
    },
    blur: {},
    select: {
      itemStyle: {
        color: "#b50205",
      },
      label: {
        show: false,
        textBorderColor: "#fff",
        textBorderWidth: 2,
      },
    },
  },
  grid: {
    left: "60%",
    top: "20%",
    bottom: "20%",
  },
  xAxis: {},
  yAxis: {
    data: [
      "heart",
      "large-intestine",
      "small-intestine",
      "spleen",
      "kidney",
      "lung",
      "liver",
    ],
  },
  series: [
    {
      type: "bar",
      emphasis: {
        focus: "self",
      },
      data: [121, 321, 141, 52, 198, 289, 139],
    },
  ],
};
onMounted(async () => {
//   const svg = await getSvg();
//   echarts.registerMap("organ_diagram", { svg });
//   chart = echarts.init(document.getElementById("body-chart"));
//   chart.setOption(option);
});

async function getSvg() {
//   const res = await fetch(bodySvg);
//   return res.text();
}
</script>

<style lang="less" scoped>
#body-chart {
  height: 560px;
}
</style>
