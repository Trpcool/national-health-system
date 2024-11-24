<template>
  <!--菜单选项 -->
  <el-sub-menu :index="navItem.name" v-if="navItem.isMenu">
    <template #title>
      <Icon v-if="navItem.icon" :name="navItem.icon" class="icon" />
      <span>{{ navItem.name }}</span>
    </template>
    <el-menu-item-group>
      <template
        v-for="childrenItem in navItem.children"
        :key="childrenItem.path"
      >
        <sideNavItem :navItem="childrenItem" />
      </template>
    </el-menu-item-group>
  </el-sub-menu>
  <!--普通选项 -->
  <el-menu-item :index="navItem.path" v-else>
    <Icon
      v-if="navItem.icon"
      :name="navItem.icon"
      :color="crtPath === navItem.path ? '#409eff' : null"
      class="icon"
    />
    <span>{{ navItem.name }}</span>
  </el-menu-item>
</template>

<script setup>
// 侧边栏递归组件
import { defineProps, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const crtPath = computed(() => route.path);
defineProps({
  navItem: {
    type: Object,
    default: () => ({
      icon: "",
      isMenu: false,
      path: "",
      name: "",
      children: [],
    }),
  },
});
</script>

<style lang="less" scoped>
.icon {
  margin-right: 10px;
}
</style>
