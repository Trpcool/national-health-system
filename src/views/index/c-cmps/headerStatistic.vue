<template>
  <el-row class="statistic-container" v-loading="loading">
    <el-col :span="6">
      <div class="st-item">
        <p class="label">
          销售总额<el-icon><Money /></el-icon>
        </p>
        <el-statistic
          :value="total_sell"
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
          :value="output_num"
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
          :value="output_num"
          value-style="font-size: 20px;color: #409eff"
        >
          <template #suffix>
            <span style="font-size: 20px; color: #409eff">
              {{ "/" + parseInt(input_num) }}
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
          :value="register_num"
          value-style="font-size: 20px;color: #409eff"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
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

const loading = ref(false);

// 总收益
const totalSell = ref(0);
// 出库量
const outputNum = ref(0);
// 入库量
const inputNum = ref(0);
// 药房入驻
const registerNum = ref(0);

// transition动画
const total_sell = useTransition(totalSell, {
  duration: 1800,
});
const output_num = useTransition(outputNum, {
  duration: 1800,
});
const input_num = useTransition(inputNum, {
  duration: 1800,
});
const register_num = useTransition(registerNum, {
  duration: 1800,
});
loading.value = true;
// 加载中蒙层配置
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    totalSell.value = 1220330;
    outputNum.value = 1210;
    inputNum.value = 1120;
    registerNum.value = 11221;
  }, 1500);
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
