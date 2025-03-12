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
      <AI />
    </div>
  </div>
</template>

<script setup>
import SideNav from "./side_nav/index.vue";
import Header from "./header/index.vue";
import AI from "../components/aiAssaitant/index.vue";
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
  width: 100vw;
  .main {
    flex: auto;
    background: @themBgColor;
    display: flex;
    flex-direction: column;
    position: relative;
    .views {
      flex: 1;
      padding: 20px;
      overflow-y: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 12px;
      }
      &::-webkit-scrollbar-thumb {
        background: #77777766;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          background: #777777aa;
        }
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
