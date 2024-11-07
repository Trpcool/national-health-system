<template>
  <el-card v-loading="loading" style="height: fit-content;">
    <template #header>
      <span>基本资料</span>
    </template>
    <div class="basic-info">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本资料" name="baseFile">
          <el-form
            ref="baseFileRef"
            label-width="80px"
            :model="baseFile"
            :rules="baseFileRules"
          >
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="baseFile.email"
                placeholder="请输入邮箱"
                :disabled="baseFile.disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="baseFile.phone"
                placeholder="请输入手机号"
                :disabled="baseFile.disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="info"
                @click="baseFile.disabled = !baseFile.disabled"
                v-if="userInfo.proType !== ROLE.SUPER_ADMIN"
                >{{ baseFile.disabled ? "编辑" : "取消" }}</el-button
              >
              <el-button
                type="primary"
                @click="submitForm(baseFileRef, baseFile)"
                v-show="!baseFile.disabled"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="psw">
          <el-form
            ref="pswRef"
            label-width="80px"
            :model="psw"
            :rules="pswRules"
          >
            <el-form-item label="新密码" prop="password">
              <el-input
                type="password"
                v-model="psw.password"
                show-password
                placeholder="请输入新密码"
                :disabled="psw.disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPsw">
              <el-input
                type="password"
                v-model="psw.confirmPsw"
                show-password
                placeholder="请再次输入密码"
                :disabled="psw.disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="psw.disabled = !psw.disabled" v-if="userInfo.proType !== ROLE.SUPER_ADMIN">{{
                psw.disabled ? "编辑" : "取消"
              }}</el-button>
              <el-button
                type="primary"
                @click="submitForm(pswRef, psw)"
                v-show="!psw.disabled"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { ROLE } from "@/utils/role";
import { updateUserInfoAPI } from "@/network/user";
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/token";
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(["updateUserInfo"]);

const loading = ref(false);
const router = useRouter();
const baseFileRef = ref(null);
const pswRef = ref(null);
const activeName = ref("baseFile");
const baseFile = ref({
  email: props.userInfo.email,
  phone: props.userInfo.phone,
  disabled: true,
});
const psw = ref({
  password: "",
  confirmPsw: "",
  disabled: true,
});

const validatePass = (rule, value, callback) => {
  if (value !== psw.value.password) {
    callback(new Error("两次密码不一致"));
  } else {
    callback();
  }
};

const baseFileRules = {
  email: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: "请输入正确的邮箱",
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
};

const pswRules = {
  password: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "密码长度在6-12位之间",
      trigger: "blur",
    },
    {
      pattern: /^[A-Z][a-zA-Z0-9_]+$/,
      message: "密码只能以大写字母开头、包含字母、数字、下划线",
      trigger: "blur",
    },
  ],
  confirmPsw: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: validatePass, message: "两次密码不一致", trigger: "blur" },
  ],
};

const submitForm = (formNameRef, value = {}) => {
  const { disabled, ...params } = value;
  formNameRef.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      // 由于之前的toke解析的信息已失效，更新本地token
      const token = await updateUserInfoAPI({
        proId: props.userInfo.proId,
        ...params
      });
      if (!token) {
        removeToken();
        return router.replace("/login");
      }
      emits("updateUserInfo", token);
      loading.value = false;
    } else {
      return false;
    }
  });
};

const handleClick = (tab, event) => {
  console.log(tab, event);
};
</script>

<style lang="less" scoped></style>
