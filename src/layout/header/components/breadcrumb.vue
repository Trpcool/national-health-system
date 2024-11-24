<template>
  <el-breadcrumb separator="/">
    <transition-group name="list">
      <el-breadcrumb-item
        v-for="item in breadcrumbItems"
        :key="item.path"
        :to="{ path: item.path }"
      >
        {{ item.name }}</el-breadcrumb-item
      >
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { getSideNavMenu } from "@/router/home_routes";
const route = useRoute();
const breadcrumbItems = computed(() => {
  const path = route.path;
  return findBreadcrumbItems(path);
});
// 查询当前路由路径
const findBreadcrumbItems = (path) => {
  let res = [];
  let stop = false;
  if (path === "/admin/profile") {
    return [{ name: "个人中心", path: "/admin/profile" }];
  }
  function _find(navData) {
    for (let i = 0; i < navData.length; i++) {
      if (stop) {
        return;
      } else if (navData[i].path === path) {
        res.push(navData[i]);
        stop = true;
      } else if (navData[i].isMenu) {
        res.push(navData[i]);
        _find(navData[i].children);
      } else if (i === navData.length - 1) {
        res = [];
      }
    }
  }
  _find(getSideNavMenu());
  return res;
};
</script>

<style lang="less" scoped>
.list-enter-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>
