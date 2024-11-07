<template>
  <div class="profile-wrapper">
    <userProfile :userInfo="userInfo" @updateUserInfo="handleUpdateUserInfo"/>
    <baseInfo :userInfo="userInfo" @updateUserInfo="handleUpdateUserInfo" style="flex: 1;"/>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import userProfile from "./c-cmps/userProfile.vue";
import baseInfo from "./c-cmps/baseInfo.vue";
import { setToken } from "@/utils/token";
const userStore = useUserStore();
const userInfo = computed(() => userStore);

const handleUpdateUserInfo = (token) => {
  setToken(token);
  userStore.getUserInfo();
};

</script>

<style lang="less" scoped>
.profile-wrapper {
  display: flex;
  gap: 20px;
}
</style>
