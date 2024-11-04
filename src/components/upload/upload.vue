<template>
  <popup width="800" ref="popupRef" title="上传图片">
    <template #toggle>
      <span>修改</span>
    </template>
    <div class="upload-editor">
      <div class="clip-area" style="height: 350px; width: 350px">
        <VueCropper
          ref="cropperRef"
          :img="originUrl"
          :outputSize="1"
          :outputType="'png'"
          :autoCropWidth="200"
          :autoCropHeight="200"
          full
          autoCrop
          fixedBox
          centerBox
          @realTime="handleRealTimeImg"
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
              'border-radius': '50%',
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
        <el-button @click="chooseFile">选择图片</el-button>
        <span>
          <el-button @click="popupRef.close()">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </div>
    </template>
  </popup>
</template>

<script setup>
import { ref } from "vue";
import { validateImgFile } from "@/utils/validateFile";
import feedback from "@/utils/feedback";
import { VueCropper } from "vue-cropper";

const popupRef = ref(null);
const cropperRef = ref(null);
const originUrl = ref("");

// 生成剪切的照片
const handleConfirm = async () => {
  cropperRef.value?.getCropBlob((data) => {
    console.log(blob);
  });

  //   popupRef.value?.close();
};

const chooseFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.onchange = async ({ target: { files } }) => {
    try {
      await validateImgFile(files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = () => {
        originUrl.value = fileReader.result;
      };
    } catch (error) {
      feedback.msgWarning(error.message);
    }
  };
};

let previewStyle1 = ref({});
let previews = ref({ w: "200", h: "200" });
const handleRealTimeImg = async (data) => {
  const preview = data;
  previewStyle1.value = {
    width: preview.w + "px",
    height: preview.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: 200 / preview.h,
  };
  previews.value = data;
};
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
  }
}
.btns {
  display: flex;
  justify-content: space-between;
}
</style>
