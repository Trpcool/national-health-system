<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      :action="action"
      list-type="picture-card"
      :on-success="uploadSuccess"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :accept="'image/*'"
      :disabled="disabled"
      ref="uploadRef"
      :headers="{
        token: getToken(),
      }"
      :limit="6"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <p class="tips" v-if="showTips">
      上传图片支持JPG、JPEG、PNG、GIF格式，且不超过5M
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { BASE_URL } from "@/network/config";
import { Plus } from "@element-plus/icons-vue";
import { getToken } from "@/utils/token";
import feedback from "@/utils/feedback";

//配置url
const action = BASE_URL + "/common/upload";
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  showTips: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue"]);

const uploadRef = ref(null);
const fileList = ref([
  // {
  //   name: "",
  //   url: "",
  // }
]);
watch(
  () => {
    fileList.value = props.modelValue.map((url) => ({
      name: "",
      url,
    }));
  },
  { once: true }
);

// 图片上传时
const handleBeforeUpload = (file) => {
  const size = file.size / 1024 / 1024;
  if (size > 2) {
    feedback.msgError("图片大小不能超过5M");
    return false;
  }
};

// 上传成功
const uploadSuccess = (result) => {
  emits("update:modelValue", [...props.modelValue, result.data]);
};
// 删除图片
const handleRemove = (file) => {
  emits(
    "update:modelValue",
    props.modelValue.filter((url) => url !== file.url)
  );
};
</script>

<style lang="less" scoped></style>
