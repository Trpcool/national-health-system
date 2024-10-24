<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbItems"
      :to="{ path: item.path }"
      >{{ item.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import navData from "../../side_nav/nav-data";
const route = useRoute();
// const breadcrumbItems = ref([]);
// watch(() => route.path, (newPath) => {
//    console.log("change")
// })

const breadcrumbItems = computed(() => {
  const path = route.path;
  console.log(path);
  return findBreadcrumbItems(path);
});
// 查询当前路由路径
const findBreadcrumbItems = (path) => {
  let res = [];
  let stop = false;
  function _find(navData) {
    // navData.forEach((item,index) => {
    //  if (item.path === path) {
    //     res.push(item);
    //     stop = true;
    //   } else if (item.hasChildren) {
    //     res.push(item);
    //     _find(item.children);
    //   }else if(index === navData.length-1){
    //     res.pop();
    //   }
    // });
    for (let i = 0; i < navData.length; i++) {
      if (stop) {
        return;
      } else if (navData[i].path === path) {
        res.push(navData[i]);
        stop = true;
      } else if (navData[i].hasChildren) {
        res.push(navData[i]);
        _find(navData[i].children);
      } else if (i === navData.length - 1) {
        res = [];
      }
    }
  }
  _find(navData);
  return res;
};
</script>

<style lang="scss" scoped></style>
