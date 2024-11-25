<template>
  <div class="side-nav">
    <el-menu router :default-active="crtPath" :collapse="isCollapse">
      <el-menu-item>
        <p class="system-name">国民健康管理系统</p>
      </el-menu-item>
      <!-- 子菜单递归 -->
      <sideNavItem
        v-for="item in navMenuList"
        :key="item.path"
        :navItem="item"
      />
    </el-menu>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { getSideNavMenu } from "@/router/home_routes";

const navMenuList = getSideNavMenu();
const appStore = useAppStore();
const route = useRoute();
const crtPath = computed(() => route.path);
const isCollapse = computed(() => appStore.isCollapse);
</script>

<style lang="less" scoped>
@import "@/assets/styles/them_var";
.side-nav {
  display: flex;
  flex-direction: column;
  .system-name {
    color: @themFontColor;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow-x: hidden;
    text-wrap: nowrap;
  }
}
</style>
