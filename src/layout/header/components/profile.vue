<template>
  <div class="avatar-wrapper">
    <p>{{ tips }}</p>
    <el-dropdown style="height: 100%;">
      <div class="profile">
        <span>{{ userStore.nickname }}</span>
        <el-avatar shape="circle" :size="40" :src="userStore.avatar" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goToProfile">个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { welcomeTips } from "@/utils";
import feedback from "@/utils/feedback";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const tips = welcomeTips();

const handleLogout = async () => {
  await feedback.confirm("退出登录");
  userStore.logout();
  router.push("/login");
};
const goToProfile = () => router.push("/admin/profile");
</script>

<style lang="less" scoped>
.avatar-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 20px;
  & > p {
    color: #1a1a1ad5;
  }
  .profile {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    padding: 0px 20px 0px 10px;
    &:hover {
      cursor: pointer;
      background: #66666621;
    }
  }

  ::v-deep .profile {
    outline: none;
  }
}
</style>
