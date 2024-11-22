<template>
  <div class="side-nav">
    <el-menu
      router
      :default-active="crtPath"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      style="flex: 1"
    >
      <el-menu-item>
        <p class="system-name">国民健康管理系统</p>
      </el-menu-item>
      <template v-for="(item, index) of navData">
        <el-menu-item
          :index="item.path"
          v-if="!item.hasChildren"
          :key="item.path"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            :color="crtPath === item.path ? '#409eff' : null"
            class="icon"
          />
          <span>{{ item.title }}</span>
        </el-menu-item>
        <el-sub-menu :index="index" v-else>
          <template #title>
            <Icon
              v-if="item.icon"
              :color="crtPath === item.path ? '#409eff' : null"
              :name="item.icon"
              class="icon"
            />
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(child, c_index) of item.children"
              :index="child.path"
              :key="child.path"
            >
              <Icon
                v-if="child.icon"
                :name="child.icon"
                :color="crtPath === item.path ? '#409eff' : null"
                class="icon"
              />
              <span>{{ child.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import navData from "./nav-data";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useAppStore } from "@/store/modules/app";
import { getSideNavMenu } from "@/router/home_routes";


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
  .icon {
    margin-right: 10px;
  }
}
</style>
