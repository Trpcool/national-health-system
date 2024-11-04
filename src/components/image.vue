<template>
  <el-image
    :style="styleSize"
    :src="url"
    :max-scale="2"
    :min-scale="0.2"
    :preview-src-list="[url]"
    :lazy="props.lazy"
    :fit="fit"
  >
    <template #error>
      <div class="image-slot">
        <span>加载失败!</span>
      </div>
    </template>
  </el-image>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { addUint } from "../utils";
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  with: {
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
  width: addUint(props.with),
  height: addUint(props.height),
}));
</script>

<style lang="less" scoped>
</style>
