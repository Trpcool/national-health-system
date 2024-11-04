<template>
  <div class="ratio-charts">
    <div id="e-charts1"></div>
    <div id="e-charts2"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const option = {
  legend: {
    orient: "vertical",
    right: 10,
    top: "center",
  },
  toolbar: {
    show: true,
  },
  series:{
    type: "pie",
    data: [
    {
      value: 335,
      name: "直接访问",
    },
    {
      value: 234,
      name: "联盟广告",
    },
    {
      value: 1548,
      name: "搜索引擎",
    },
  ],
  }
 
};
// 初始化图表
const init = () => {
  const echart1 = echarts.init(document.querySelector("#e-charts1"));
  const echart2 = echarts.init(document.querySelector("#e-charts2"));
  echart1.setOption(option);
  echart2.setOption(option);
};
onMounted(init);
</script>

<style lang="less" scoped>
.ratio-charts {
  height: 400px;
  margin-top: 20px;
  display: flex;
  & > div {
    height: 100%;
    width: 50%;
  }
}
</style>
