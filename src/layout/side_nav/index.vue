<template>
  <div class="side-nav">
    <p>国民健康管理系统</p>
    <el-menu router :default-active="crtPath" class="el-menu-vertical-demo" style="flex:1;">
      <template v-for="item,index of navData">
        <el-menu-item :index="item.path" v-if="!item.hasChildren" :key="item.path">
          <span>{{item.title}}</span>
        </el-menu-item>
        <el-sub-menu :index="index" v-else>
          <template #title>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="child,c_index of item.children" :index="child.path" :key="child.path">
              <span>{{child.title}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import navData from "./nav-data"
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();
const crtPath = computed(() => route.path);
</script>

<style lang="less" scoped>
@import "@/assets/styles/them_var";
.side-nav {
  width: 170px;
  display: flex;
  flex-direction: column;
  p{
    color: @themFontColor;
    height: 50px;
    text-align: center;
    overflow: hidden;
    line-height: 50px;
    border-right: 1px solid var(--el-menu-border-color)
  }
}
</style>
