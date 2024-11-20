<template>
  <div class="collapse-icon-wrapper" @click="appStore.changeCollapse">
    <el-icon v-if="!isCollapse"><Fold /></el-icon>
    <el-icon v-else><Expand /></el-icon>
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/modules/app";
import { Fold, Expand } from "@element-plus/icons-vue";
import { computed } from "vue";
const appStore = useAppStore();
const isCollapse = computed(() => appStore.isCollapse);
</script>

<style lang="less" scoped>
.collapse-icon-wrapper {
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
</style>
