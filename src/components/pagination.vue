<template>
  <el-pagination
  style="margin-top: 20px;"
    v-model:current-page="props.modelValue.currentPage"
    v-model:page-size="props.modelValue.pageSize"
    :page-sizes="props.modelValue.pageSizes"
    :background="false"
    layout="total, sizes, prev, pager, next, jumper"
    :total="props.modelValue.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 15,
      pageSizes: [15, 30, 50, 100],
      total: 0,
    }),
  },
});
const emits = defineEmits(["update:modelValue"]);
const handleSizeChange = (val) => {
  emits("update:modelValue", { ...props.modelValue, pageSize: val });
};

const handleCurrentChange = (val) => {
  emits("update:modelValue", { ...props.modelValue, currentPage: val });
};
</script>

<style lang="less" scoped></style>
