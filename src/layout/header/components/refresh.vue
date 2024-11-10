<template>
  <div class="refresh-icon-wrapper" @click="handleRefresh">
    <el-icon class="icon"><Refresh /></el-icon>
  </div>
</template>

<script setup>
import { Refresh } from "@element-plus/icons-vue";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();

const handleRefresh = () => {
  appStore.refreshPage();
};
</script>

<style lang="less" scoped>
.refresh-icon-wrapper {
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #66666621;
  }
}
.icon {
  cursor: pointer;
  font-size: 20px;
}
</style>
