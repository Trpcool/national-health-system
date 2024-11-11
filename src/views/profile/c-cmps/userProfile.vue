<template>
  <el-card v-loading="loading" element-loading-text="修改中..." style="width: 380px">
    <template #header>
      <span>个人信息</span>
    </template>
    <div class="avatar-wrapper">
      <upload
        mode="avatar"
        ref="uploadRef"
        @clipped="handleClippedImg"
        v-model="formData.avatar"
        :disabled="userInfo.proType === ROLE.SUPER_ADMIN"
      />
    </div>
    <div class="info-wrapper">
      <div class="info-item">
        <span class="label">用户ID</span>
        <span class="item-value">{{ userInfo.proId }}</span>
      </div>
      <div class="info-item">
        <span class="label"
          ><el-icon><User /></el-icon>用户姓名</span
        >
        <span class="item-value">{{ userInfo.nickname }}</span>
      </div>
      <div class="info-item">
        <span class="label"
          ><el-icon><User /></el-icon>身份证号</span
        >
        <span class="item-value">{{ userInfo.idNumber }}</span>
      </div>

      <div class="info-item">
        <span class="label"
          ><el-icon><Iphone /></el-icon>手机号码</span
        >
        <span class="item-value">{{ userInfo.phone }}</span>
      </div>
      <div class="info-item">
        <span class="label"
          ><el-icon><Message /></el-icon>用户邮箱</span
        >
        <span class="item-value">{{ userInfo.email }}</span>
      </div>

      <div class="info-item">
        <span class="label"
          ><el-icon><UserFilled /></el-icon>用户角色</span
        >
        <span class="item-value">{{ getRoleName(userInfo.proType) }}</span>
      </div>

      <div class="info-item">
        <span class="label"
          ><el-icon><Calendar /></el-icon>创建日期</span
        >
        <span class="item-value">{{ userInfo.createdTime }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import feedback from "@/utils/feedback";
import { updateUserInfoAPI } from "@/network/user";
import {
  User,
  Iphone,
  Message,
  UserFilled,
  Calendar,
} from "@element-plus/icons-vue";
import { ROLE,getRoleName } from "@/utils/role";

const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(["updateUserInfo"]);
const uploadRef = ref(null);
const loading = ref(false);

const formData = ref({
  avatar: props.userInfo.avatar,
});

// 裁剪完图片后上传图片
const handleClippedImg = async () => {
  loading.value = true;
  try {
    await uploadRef.value?.startUpload();
    const token = await updateUserInfoAPI({
      proId: props.userInfo.proId,
      avatar: formData.value.avatar,
    });
    emits("updateUserInfo", token);
  } catch (error) {
    feedback.msgError("上传失败请重新上传！");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.avatar-wrapper {
  display: flex;
  justify-content: center;
  padding: 20px 0px;
  font-size: 12px;
}
.info-wrapper {
  .info-item {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px #6666;
    padding: 10px;
    ::v-deep .el-icon {
      position: relative;
      top: 2px;
      margin-right: 3px;
    }
  }
}
</style>
