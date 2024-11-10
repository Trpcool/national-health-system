<template>
  <div class="full-screen-wrapper" @click="handClick">
    <el-icon class="icon" ><FullScreen /></el-icon>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FullScreen } from "@element-plus/icons-vue";
const isFullScreen = ref(false);
// 读取是不是全屏模式
const isFullScreenMode = () => {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};
console.log(isFullScreenMode());
const openFullScreen = (el) => {
  console.log("openFullScreen");
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
  isFullScreen.value = true;
};

const closeFullScreen = (el) => {
  document.exitFullscreen();
  isFullScreen.value = false;
};
const handClick = () => {
  const el = document.documentElement;
  isFullScreen.value ? closeFullScreen(el) : openFullScreen(el);
};
</script>

<style lang="less" scoped>
.full-screen-wrapper {
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #66666621;
  }
  .icon {
    cursor: pointer;
  }
}
</style>
