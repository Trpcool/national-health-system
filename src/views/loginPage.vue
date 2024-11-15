<template>
  <div class="login">
    <div class="form">
      <h3>国民健康管理系统</h3>
      <el-form
        ref="formRef"
        style="width: 100%"
        :model="loginForm"
        :rules="loginRules"
        label-width="auto"
        class="demo-ruleForm"
        :hide-required-asterisk="true"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            :prefix-icon="User"
            v-model="loginForm.username"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            :prefix-icon="Lock"
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            show-password
          />
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="display: flex">
          <el-input
            v-model="loginForm.code"
            autocomplete="off"
            style="width: 20%"
          />

          <img
            v-if="imgUrl"
            style="margin-left: 30px"
            :src="imgUrl"
            alt=""
          />
          <p class="change-tips" @click="handleChange">看不清! 点击切换</p>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "../store/modules/user";
import { useRouter } from "vue-router";

const formRef = ref(null);
const imgUrl = ref("http://47.109.178.24:8080/admin/captcha");

const loginForm = ref({
  username: "125148",
  password: "123456",
  code: "123213",
});
const loading = ref(false);

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "blur", message: "请输入验证码" }],
};

const userStore = useUserStore();
const router = useRouter();
const submitForm = async () => {
  try {
    loading.value = true;
    await formRef.value.validate();
    await userStore.login(loginForm.value);
    loading.value = false;
    router.push("/admin");
  } catch (err) {
    loading.value = false;
  }
};

const handleChange = async () => {
  imgUrl.value = "";
  await nextTick();
  imgUrl.value = "http://47.109.178.24:8080/admin/captcha?a=" + new Date().getTime(); //防止走缓存
};
</script>

<style lang="less" scoped>
@import "../assets/styles/them_var";
.login {
  width: 100%;
  height: 100%;
  background-image: url(https://national-health.oss-cn-chengdu.aliyuncs.com/bfc490d3-8c33-4691-95aa-77e94dfdb227.png);
  background-size: cover;
  background-position: center center;
  background-blend-mode: screen;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .form {
    width: 500px;
    height: 300px;
    backdrop-filter: blur(10px) brightness(90%);
    background-color: rgba(255, 255, 255, 0.604);
    border-radius: 10px;
    margin-right: 180px;
    padding: 10px 35px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .change-tips {
      color: @themColor;
      margin-left: 10px;
      cursor: pointer;
      user-select: none;
    }
    h3 {
      color: @themFontColor;
      margin: 20px 0px;
    }
    .rg-icon {
      color: @themColor;
      cursor: pointer;
    }
    img{
      height: 30px;
    }
  }
}
</style>
