<template>
  <el-row class="statistic-container">
    <el-col :span="6">
      <div class="st-item">
        <p class="label">
          销售总额<el-icon><Money /></el-icon>
        </p>
        <el-statistic
          :value="10000000000"
          value-style="font-size: 20px;color: #409eff"
        />
        <p
          style="
            font-size: 20px;
            position: relative;
            bottom: 0px;
            color: #409eff;
          "
        >
          ￥
        </p>
      </div>
    </el-col>
    <el-col :span="6" class="el-col">
      <div class="st-item">
        <p class="label">
          药品出库量<el-icon><Top /></el-icon>
        </p>
        <el-statistic
          :value="data.out"
          value-style="font-size: 20px;color: #409eff"
        />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="st-item">
        <p class="label">
          药品出入库比<el-icon><Switch /></el-icon>
        </p>
        <el-statistic
          :value="data.out"
          value-style="font-size: 20px;color: #409eff"
        >
          <template #suffix>
            <span style="font-size: 20px; color: #409eff">
              {{ "/100" }}
            </span>
          </template></el-statistic
        >
      </div>
    </el-col>

    <el-col :span="6">
      <div class="st-item">
        <p class="label">
          药房入驻量<el-icon><HomeFilled /></el-icon>
        </p>
        <el-statistic
          :value="data.out"
          value-style="font-size: 20px;color: #409eff"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useTransition } from "@vueuse/core";
import { HomeFilled, Switch, Money, Top } from "@element-plus/icons-vue";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      out: 1000,
      outInput: 0,
      total: 100000,
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-col {
  display: flex;
  align-items: center;
  justify-content: center;
  .st-item {
    display: flex;
    .label {
      font-size: 16px;
      position: relative;
      bottom: -10px;
      margin-right: 5px;
    }
  }
}
</style>
