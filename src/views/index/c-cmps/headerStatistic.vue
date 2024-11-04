<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="药品出库量" :value="268500" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            药品出入库比
            <el-icon style="margin-left: 5px;"><Switch /></el-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="销售总额" :value="outputValue" >
        <template #prefix>
          <span>
            ￥
          </span>
          </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="药房入驻数量" :value="562">
        <template #suffix>
          <el-icon  style="vertical-align: -0.125em"><HomeFilled /></el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from "vue";
import { useTransition } from "@vueuse/core";
import { HomeFilled, Switch } from "@element-plus/icons-vue";

const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1500,
});
source.value = 172000;
</script>

<style lang="less" scoped>
.el-col {
  text-align: center;
}
</style>
