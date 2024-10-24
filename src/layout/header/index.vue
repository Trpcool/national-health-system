<template>
  <div class="header">
    <div class="left">
      <refresh />
      <breadcrumb/>
    </div>
    <div class="right">
      <profile />
    </div>
  </div>
</template>

<script setup>
import Refresh from "./components/refresh.vue";
import profile from "./components/profile.vue";
import breadcrumb from "./components/breadcrumb.vue";
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background: white;
  border-bottom: solid 1px #ccc;
  display: flex;
  padding: 0px 20px;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    gap:13px;
  }
}
</style>
