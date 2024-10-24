<template>
  <div class="layout">
    <SideNav />
    <div class="main">
      <Header />
      <div class="views" v-if="isShow">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import SideNav from "./side_nav/index.vue";
import Header from "./header/index.vue";
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();
const isShow = computed(() => appStore.refresh);
</script>

<style lang="less" scoped>
@import "@/assets/styles/them_var";
.layout {
  display: flex;
  height: 100%;
  .main {
    flex: 1;
    background: @themBgColor;
    display: flex;
    flex-direction: column;
    .views {
      flex: 1;
      padding: 20px;
      overflow-y: scroll;
      &::-webkit-scrollbar-track{
        display: none;
      }

      &::-webkit-scrollbar-button{
        display: none;
      }
    }
  }
}
</style>
