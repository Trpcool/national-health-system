<template>
  <div
    class="upload-container"
    :style="containerSize"
    @click="
      () => {
        if (!imgUrl) handleReadeFile();
      }
    "
  >
    <div v-if="imgUrl" class="img-pre-container">
      <el-image
        :style="containerSize"
        :src="imgUrl"
        :max-scale="2"
        :min-scale="0.2"
        :preview-src-list="[imgUrl]"
        fit="cover"
      >
        <template #error>
          <div class="image-slot">
            <span>加载失败!</span>
          </div>
        </template>
      </el-image>
      <p class="edit-btn">
        <upload @clipt="handleCliptImg" />
      </p>
    </div>
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, defineExpose } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { uploadImgAPI } from "@/network/upload";
import { addUint } from "@/utils";
import upload from "./upload.vue";

const props = defineProps({
  //使用模式 preview-普通图片/avatar-头像/
  mode: {
    type: String,
    default: "preview",
  },
  // 图片地址
  modelValue: {
    type: String,
    default: "",
  },
  // 头像尺寸
  size: {
    type: Number,
    default: 70,
  },
  // 图片宽度
  width: {
    type: String,
    default: "200",
  },
  // 图片高度
  height: {
    type: String,
    default: "200",
  },
});
const emits = defineEmits(["update:modelValue"]);

const imgUrl = ref(props.modelValue);

const containerSize = computed(() => ({
  width: addUint(props.mode === "avatar" ? props.size : props.width),
  height: addUint(props.mode === "avatar" ? props.size : props.height),
  border: imgUrl.value ? "none" : "#6666 dashed 1px",
  borderRadius: "4px",
}));

// 临时保存file,等待上传服务器
let tempFile = null;
const handleCliptImg = (blob) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(blob);
  fileReader.onload = () => {
    imgUrl.value = fileReader.result;
  };
  tempFile = new File([blob], `${new Date().getTime()}.png`);
};

//上传服务器
const startUpload = async () => {
  if (!tempFile) return;
  const resUrl = await uploadImgAPI(tempFile);
  emits("update:modelValue", resUrl);
  return resUrl;
};

// 是否启用修改选项
const isEdit = computed(() => {
  return imgUrl.value;
});

defineExpose({
  startUpload,
});
</script>

<style lang="less" scoped>
.upload-container {
  border: #6666 dashed 1px;
  border-radius: 3px;
  cursor: pointer;
  .img-pre-container {
    position: relative;
    width: inherit;
    height: inherit;
    .edit-btn {
      position: absolute;
      bottom: 0px;
      background: #6666;
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
      color: white;
      display: none;
    }

    &:hover {
      .edit-btn {
        display: block;
      }
    }
  }
  .avatar-uploader-icon {
    color: #8c939d;
    margin: 50% 0 0 50%;
    transform: translate(-50%, -50%);
  }
  .image-slot {
    width: 100%;
    height: 100%;
    background: #cacaca66;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #808080;
  }
}
</style>
