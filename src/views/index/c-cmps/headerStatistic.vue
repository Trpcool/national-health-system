<template>

    <el-row class="statistic-container">
      <el-col :span="6">
        <el-statistic title="药品出库量" :value="data.out" />
      </el-col>
      <el-col :span="6">
        <el-statistic :value="data.outInput">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              药品出入库比
              <el-icon style="margin-left: 5px"><Switch /></el-icon>
            </div>
          </template>
          <template #suffix>/100</template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="销售总额" :value="outputValue">
          <template #prefix>
            <span> ￥ </span>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="药房入驻数量" :value="data.register">
          <template #suffix>
            <el-icon style="vertical-align: -0.125em"><HomeFilled /></el-icon>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useTransition } from "@vueuse/core";
import { HomeFilled, Switch } from "@element-plus/icons-vue";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      out: 0,
      outInput: 0,
      total: 0,
      register: 0,
    }),
  },
});
const total = ref(0);
const outputValue = useTransition(total, {
  duration: 1500,
});
watchEffect(() => {
  total.value = props.data.total;
});
</script>

<style lang="less" scoped>
.statistic-container {
  padding: 20px;
  border-radius: 5px;
  background: #ffffff;
}
.el-col {
  text-align: center;
}
</style>
