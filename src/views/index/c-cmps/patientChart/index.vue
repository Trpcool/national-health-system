<template>
  <el-card
    never="none"
    style="margin-top: 10px"
    v-loading="loading"
    element-loading-text="统计中..."
  >
    <template #header>健康分布</template>
    <div class="chart-container">
      <div id="body-chart"></div>
      <div class="data-plane-container">
        <data-plane :data="data" />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from "vue";
import * as echarts from "echarts";
import bodySvg from "@/assets/body_svg/body.svg";
import DataPlane from "./dataPlane.vue";

const loading = ref(false);
const data = ref({});
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      min: 0,
      max: 500,
      data: [
        {
          name: "心脏",
          value: 400,
        },
        {
          name: "大肠",
          value: 300,
        },
        {
          name: "小肠",
          value: 200,
        },
        {
          name: "脾胃",
          value: 100,
        },
      ],
    }),
  },
});
// const data = ref([]);
let chart = null;
//柱状图顶部显示值配置
const label = {
  show: true,
  position: "right",
  formatter: function (params) {
    return params.value + "例";
  },
};
// ehcarts 配置项
const option = {
  title: {
    text: "疾病人体分布状况",
    left: "41%",
    top: "5%",
    subtext: "病患数量：例",
  },
  geo: {
    left: 10,
    right: "60%",
    map: "organ_diagram",
    selectedMode: "multiple",
    emphasis: {
      focus: "self",
      itemStyle: {
        color: null,
      },
      label: {
        position: "bottom",
        distance: 10,
        textBorderColor: "#fff",
        textBorderWidth: 2,
        formatter: function (params) {
          return params.name;
        },
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
    zoom: 1.8,
  },
  grid: {
    left: "45%",
    top: "20%",
    bottom: "5%",
  },
  tooltip: {
    trigger: "item",
    position: "right",
    formatter: function (params) {
      return params.name + "器官相关类疾病" + params.value + "例";
    },
  },
  xAxis: {
    type: "value",
    min: 0,
    max: 500,
    // 属性名称
    // name: "病患数量：个",
  },
  yAxis: {
    data: ["心脏", "大肠", "小肠", "脾胃", "肾脏", "肺", "肝脏"],
  },
  series: [
    {
      type: "bar",
      emphasis: {
        focus: "self",
      },
      data: [
        {
          label,
          value: 400,
          itemStyle: {
            color: "#ff934d",
          },
        },
        {
          label,
          value: 300,
          itemStyle: {
            color: "#ffe097",
          },
        },
        {
          label,
          value: 200,
          itemStyle: {
            color: "#ffe097",
          },
        },
        {
          label,
          value: 100,
          itemStyle: {
            color: "#de8747",
          },
        },
        {
          label,
          value: 50,
          itemStyle: {
            color: "#a36148",
          },
        },
        {
          label,
          value: 100,
          itemStyle: {
            color: "#808080",
          },
        },
        {
          label,
          value: 100,
          itemStyle: {
            color: "#b47f34",
          },
        },
      ],
    },
  ],
};
// 更新图表数据
const refreshChart = (min, max, valueList) => {
  if (!chart) return;
  option.xAxis.min = min;
  option.xAxis.max = max;
  option.series[0].data = option.series[0].data.map((item, index) => {
    item.value = valueList[index];
    return item;
  });
  chart.setOption(option);
};
// 挂载
onMounted(async () => {
  loading.value = true;
  const res = await fetch(bodySvg);
  const svg = await res.text();
  echarts.registerMap("organ_diagram", { svg });
  chart = echarts.init(document.getElementById("body-chart"));
  initTrigger();
  // 模拟异步获取数据
  setTimeout(() => {
    loading.value = false;
    testReq();
  }, 2200);
});
// 移动到图表显示器官位置
const initTrigger = () => {
  window.addEventListener("resize", () => {
    chart.resize();
  });
  chart.on("mouseover", { seriesIndex: 0 }, function (event) {
    chart.dispatchAction({
      type: "highlight",
      geoIndex: 0,
      name: event.name,
    });
  });
  chart.on("mouseout", { seriesIndex: 0 }, function (event) {
    chart.dispatchAction({
      type: "downplay",
      geoIndex: 0,
      name: event.name,
    });
  });
  chart.on("click", { seriesIndex: 0 }, function (event) {
    console.log(event.name);
  });
};
onBeforeUnmount(() => {
  window.removeEventListener("resize", chart.resize);
});

// 模拟请求数据
function testReq() {
  const chartsData = {
    min: 0,
    max: 500,
    data: [
      {
        value: 444,
      },
      {
        value: 300,
      },
      {
        value: 200,
      },
      {
        value: 100,
      },
      {
        value: 100,
      },
      {
        value: 100,
      },
      {
        value: 100,
      },
    ],
  };
  const planeData = {
    patients: 1787800,
    services: 1330,
    appointments: 21330,
    register: 8888,
  };
  refreshChart(chartsData.min, chartsData.max, chartsData.data.map(item=>item.value));
  data.value = planeData;
}
</script>

<style lang="less" scoped>
#body-chart {
  height: 600px;
  width: 1200px;
}
.chart-container {
  display: flex;
  .data-plane-container {
    flex: 1;
  }
}
</style>
