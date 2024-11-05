<template>
  <el-form label-width="90px" ref="formRef" :rules="rules" :model="formData">
    <el-form-item label="头像:">
      <upload mode="avatar" ref="uploadRef" v-model="formData.avatar" />
    </el-form-item>
    <el-form-item label="ID:">
      <el-input disabled v-model="userInfo.proId"
    /></el-form-item>
    <el-form-item label="账号:">
      <el-input disabled v-model="userInfo.account" />
    </el-form-item>
    <el-form-item label="昵称:" prop="nickname">
      <el-input :disabled="disabled" v-model="formData.nickname"
    /></el-form-item>
    <template v-if="!disabled">
      <el-form-item label="新密码:" prop="password">
        <el-input v-model="formData.password"
      /></el-form-item>
      <el-form-item label="确认密码:" prop="confirmPassword">
        <el-input v-model="formData.confirmPassword"
      /></el-form-item>
    </template>
    <el-form-item>
      <el-button type="info" @click="handleEnableEdit">{{
        disabled ? "编辑" : "取消"
      }}</el-button>
      <el-button type="primary" @click="submit" v-show="!disabled"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import feedback from "@/utils/feedback";
import { updateUserInfoAPI } from "@/network/user";

const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["startUpload", "uploadEnd"]);
const formRef = ref(null);
const disabled = ref(true);
const uploadRef = ref(null);

const formData = ref({
  avatar: props.userInfo.avatar,
  nickname: props.userInfo.nickname,
  password: "",
  confirmPassword: "",
});

const handleEnableEdit = () => {
  // formData.value = {
  //   avatar: props.userInfo.avatar,
  //   nickname: props.userInfo.nickname,
  //   password: "",
  //   confirmPassword: "",
  // };
  disabled.value = !disabled.value;
};

const validatePass = (rule, value, callback) => {
  if (value !== formData.value.password) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};

const rules = {
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { validator: validatePass, message: "两次密码不一致", trigger: "blur" },
  ],
};

const submit = async () => {
  let resolve, reject;
  emit(
    "uploadEnd",
    new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    })
  );
  await feedback.confirm("确认修改?");
  formRef.value.validate(async (valid) => {
    if (valid) {
      emit("startUpload");
      try {
        await uploadRef.value?.startUpload();
        const { confirmPassword, ...formDataValue } = formData.value;
        Object.assign(formDataValue, { proId: props.userInfo.proId });
        await updateUserInfoAPI(formDataValue);
        resolve("修改成功")
      } catch (error) {
        reject(error);
      }
    } else {
      return false;
    }
  });
};
</script>

<style lang="less" scoped></style>
