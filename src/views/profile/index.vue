<template>
  <el-card v-loading="loading">
    <template #header>
      <span>个人中心</span>
    </template>
    <div class="profile-container">
      <userInfoForm
        @startUpload="loading = true"
        @uploadEnd="handleEditEnd"
        :userInfo="userInfo"
      />
    </div>
  </el-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import userInfoForm from "./c-cmps/userInfoForm.vue";
const userStore = useUserStore();
const userInfo = computed(() => userStore);
const loading = ref(false);

const handleEditEnd = (p) => {
  p.then(async () => {
    loading.value = false;
  }).then(()=>use).catch(() => {
    loading.value = false;
  });
};
</script>

<style lang="less" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
