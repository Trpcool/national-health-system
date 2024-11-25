<template>
  <el-card style="width: 480px;" never="none">
    <template #header>统计占比</template>
    <div id="e-charts1"></div>
  </el-card>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";

const option = {
  tooltip: {
    trigger: 'item'
  },
  // 图例
  legend: {
    orient: 'vertical',
    right: 0,
    top: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};
// 初始化图表
const init = () => {
  const echart1 = echarts.init(document.querySelector("#e-charts1"));
  echart1.setOption(option);
};

onMounted(init);
</script>

<style lang="less" scoped>
#e-charts1{
  height: 450px;
}
</style>
