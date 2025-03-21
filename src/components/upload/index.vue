<template>
  <div class="upload-wrapper">
    <div
      class="upload-container"
      :style="containerSize"
      @click="
        () => {
          if (!imgUrl) handleOpenClipPop();
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
        <p class="edit-btn" v-if="!disabled" @click="handleOpenClipPop">
          <span>修改</span>
        </p>
      </div>
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      <clipPopup
        v-if="showClipPop"
        @cancel="showClipPop = false"
        @clipped="handleClipped"
        ref="clipPopRef"
        :previewShapeType="mode === 'avatar' ? 'circle' : 'square'"
      />
    </div>
    <p class="tips" v-if="showTips">
      上传图片支持JPG、JPEG、PNG、GIF格式，且不超过2M
    </p>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  computed,
  defineExpose,
  nextTick,
  onUnmounted,
  watch,
} from "vue";
import { Plus } from "@element-plus/icons-vue";
import { uploadImgAPI } from "@/network/upload";
import { addUint } from "@/utils";
import clipPopup from "./clipPopup.vue";

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
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否显示提示
  showTips: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue", "clipped"]);

const clipPopRef = ref(null);
const showClipPop = ref(false);
const imgUrl = ref(props.modelValue);
watch(
  () => props.modelValue,
  (val) => {
    imgUrl.value = val;
  }
);
// 打开裁剪上传窗口
const handleOpenClipPop = async () => {
  showClipPop.value = true;
  await nextTick();
  clipPopRef.value?.open();
};

const containerSize = computed(() => ({
  width: addUint(props.mode === "avatar" ? props.size : props.width),
  height: addUint(props.mode === "avatar" ? props.size : props.height),
  border: imgUrl.value ? "none" : "#6666 dashed 1px",
  borderRadius: "4px",
}));

// 临时保存file,等待上传服务器
let tempFile = null;
const handleClipped = (blob) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(blob);
  fileReader.onload = () => {
    imgUrl.value = fileReader.result;
  };
  // 临时保存等待使用的组件调用上传该文件
  tempFile = new File([blob], `${new Date().getTime()}.png`);
  // 裁剪后的回调给父组件（是否上传的权限交给父组件）
  emits("clipped");
};

//上传服务器
const startUpload = async () => {
  if (!tempFile) return;
  const resUrl = await uploadImgAPI(tempFile);
  emits("update:modelValue", resUrl);
  return resUrl;
};

onUnmounted(() => {
  tempFile = null;
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
.tips {
  margin-top: 10px;
  &::before {
    content: "*";
    color: red;
    margin-right: 2px;
  }
}
</style>
