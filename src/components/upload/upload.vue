<template>
  <popup :width="(width+150)*2" ref="popupRef" title="图片编辑">
    <div class="upload-editor" >
      <div v-loading="isLoadingImg" class="clip-area" :style="{height: props.height + 150 +'px', width: props.height + 150 +'px'}">
        <VueCropper
          ref="cropperRef"
          :img="originUrl"
          :outputSize="1"
          :outputType="'png'"
          :autoCropWidth="width"
          :autoCropHeight="height"
          full
          autoCrop
          fixedBox
          @realTime="handleRealTimeImg"
          @imgLoad="()=>isLoadingImg=false"
        />
      </div>
      <div class="preview-area">
        <div class="avatar-container">
          <p>头像预览</p>
          <div
            class="show-preview"
            :style="{
              width: previews.w + 'px',
              height: previews.h + 'px',
              overflow: 'hidden',
              margin: '5px',
              'border-radius': props.previewShapeType === 'circle' ? '50%' : '0px',
            }"
          >
            <div :style="previews.div">
              <img :src="originUrl" :style="previews.img" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="btns">
       <span>
        <el-button @click="chooseFile">请选择图片<el-icon class="el-icon--right"><Upload /></el-icon></el-button>
        <el-button @click="rotate(-1)"><el-icon><RefreshLeft /></el-icon></el-button>
        <el-button @click="rotate(1)"><el-icon><RefreshRight /></el-icon></el-button>
       </span>
        <span>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </div>
    </template>
  </popup>
</template>

<script setup>
import { ref, defineEmits,defineProps, onBeforeUnmount,defineExpose } from "vue";
import { validateImgFile } from "@/utils/validateFile";
import feedback from "@/utils/feedback";
import { VueCropper } from "vue-cropper";
import { Upload,RefreshLeft,RefreshRight } from "@element-plus/icons-vue";

const props = defineProps({
  // 裁剪预览形状
  previewShapeType:{
    type:String, // circle 圆形 square 正方形
    default:'circle'
   },
  // 裁剪宽度
   width: {
    type: Number,
    default: 200,
  },
  // 裁剪高度
  height: {
    type: Number,
    default: 200,
  }
});
const emits = defineEmits(["clipt","cancel"]);

const isLoadingImg = ref(false);
const popupRef = ref(null);
const cropperRef = ref(null);
const originUrl = ref("");
let previewStyle1 = ref({});
let previews = ref({ w:props.width, h: props.height });

// 生成剪切的照片
const handleConfirm = async () => {
  cropperRef.value?.getCropBlob((blob) => {
    emits("clipt", blob);
    popupRef.value?.close();
  });
};
// 取消编辑
const handleCancel = () => {
  popupRef.value?.close();
  emits("cancel");
};
// 选择图片
const chooseFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.onchange = async ({ target: { files } }) => {
    isLoadingImg.value = true;
    try {
      await validateImgFile(files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = () => {
        originUrl.value = fileReader.result;
      };
    } catch (error) {
      isLoadingImg.value = false;
      feedback.msgWarning(error.message);
    }
  };
};
const handleRealTimeImg = async (data) => {
  if(!data.w || !data.h)return;
  const preview = data;
  previewStyle1.value = {
    width: preview.w + "px",
    height: preview.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: props.height / preview.h,
  };
  previews.value = data;
};

const rotate = (optionNum)=> {
  if(optionNum === 1)cropperRef.value?.rotateRight();
  if(optionNum === -1)cropperRef.value?.rotateLeft();
};


onBeforeUnmount(() => {
  originUrl.value = "";
  cropperRef.value?.clearCrop();
});

defineExpose({
  open: () => popupRef.value?.open(),
  close: () => popupRef.value?.close(),
})
</script>

<style lang="less" scoped>
.upload-editor {
  display: flex;
  & > div {
    flex: 1;
    overflow: hidden;
  }
  .preview-area {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
      position: relative;
      top: -30px;
      font-size: 16px;
    }
    .show-preview{
      border: #6666 solid 1px;
    }
  }
}
.btns {
  display: flex;
  justify-content: space-between;
}
</style>
