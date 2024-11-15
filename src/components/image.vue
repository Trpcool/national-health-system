<template>
  <el-image
    :style="styleSize"
    :src="imgUrl"
    :max-scale="2"
    :min-scale="0.2"
    :preview-src-list="preImg"
    :lazy="props.lazy"
    :fit="fit"
    close-on-press-escape
  >
    <template #error>
      <div class="image-slot">
        <span>加载失败!</span>
      </div>
    </template>
    <template #placeholder>
      <div
        class="placeholder"
        :style="{ width: width + 'px', height: height + 'px' }"
        v-loading="true"
        element-loading-text="图片加载中"
      ></div>
    </template>
  </el-image>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { addUint } from "../utils";
const props = defineProps({
  url: {
    type: [String,Array],
    default: "",
  },
  width: {
    type: String,
    default: "200",
  },
  height: {
    type: String,
    default: "200",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  fit: {
    type: String,
    default: "cover",
  },
});

const styleSize = computed(() => ({
  width: addUint(props.width),
  height: addUint(props.height),
}));

const imgUrl = computed(() => {
  return Array.isArray(props.url) ? props.url[0] : props.url;
});
const preImg = computed(() => {
  return Array.isArray(props.url) ? props.url : [props.url];
});

</script>

<style lang="less" scoped>
.image-slot {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  .placeholder {
    height: 100%;
   font-size: 12px;
  }
}
</style>
