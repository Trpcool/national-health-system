<template>
  <div @click="openDialog">
    <slot name="toggle"></slot>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :before-close="() => emit('beforeClose')"
    align-center
    append-to-body
    :show-close="false"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <div class="footer-btns" v-if="!!!slots.footer">
        <el-button @click="handleClose">{{ cancelText }}</el-button>
        <el-button type="primary" @click="onsubmit">{{
          confirmText
        }}</el-button>
      </div>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose, useSlots } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  width: {
    type: String,
    default: "500",
  },
  cancelText: {
    type: String,
    default: "取消",
  },
  confirmText: {
    type: String,
    default: "确定",
  },
});
const dialogVisible = ref(false);
const emit = defineEmits(["onsubmit", "onclose", "beforeClose", "onOpen"]);
const slots = useSlots();
const openDialog = (needEmit = true) => {
  if (needEmit) emit("onOpen");
  dialogVisible.value = true;
};
const handleClose = (needEmit = true) => {
  if (needEmit) emit("onclose");
  dialogVisible.value = false;
};
const onsubmit = () => {
  emit("onsubmit");
  dialogVisible.value = false;
};

defineExpose({
  open: () => openDialog(false),
  close: () => handleClose(false),
});
</script>

<style lang="less" scoped>
.footer-btns {
  text-align: right;
}
</style>
