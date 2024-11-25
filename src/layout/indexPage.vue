<template>
  <div class="layout">
    <SideNav />
    <div class="main">
      <Header />
      <div class="views" v-if="isShow">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
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
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 15px;
      }
      &::-webkit-scrollbar-thumb {
        background: #b3b3b366;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
}

.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-70px);
}
</style>
