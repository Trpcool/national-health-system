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
    <div v-loading="loading" :element-loading-text="loadingText">
      <slot></slot>
    </div>
    <template #footer>
      <div class="footer-btns" v-if="!!!slots.footer">
        <el-button @click="handleClose" v-if="cancelText">{{
          cancelText
        }}</el-button>
        <el-button type="primary" @click="onsubmit" :loading="loading" v-if="confirmText">{{
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
    type: [String, Boolean],
    default: "取消",
  },
  confirmText: {
    type: [String, Boolean],
    default: "确定",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  loading:{
    type:Boolean,
    default:false
  },
  loadingText:{
    type:String,
    default:"加载中"
  }
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
