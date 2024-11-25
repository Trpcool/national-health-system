<template>
  <div class="medicine-content">
    <el-card style="margin-bottom: 10px" shadow="never">
      <slot name="query-form"></slot>
    </el-card>
    <el-card shadow="never">
      <slot></slot>
      <pagination v-model="pager" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
const props = defineProps({
  // 绑定pager
  modelValue: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20, 30, 50],
      total: 0,
    }),
  },
});
const emits = defineEmits(["update:modelValue"]);
const pager = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});
</script>

<style lang="less" scoped>
.medicine-content {
  position: relative;
  width: 100%;

  ::v-deep .el-table__cell {
    z-index: auto; /*初始化z-index层叠上下文（z-index:0），防止与盒子内部的z-index属性的盒子层级有冲突*/
  }
}
</style>
