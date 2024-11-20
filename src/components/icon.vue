<template>
  <svg
    :class="svgClass"
    v-bind="$attrs"
    :style="{ color: color, fontSize: size + 'px' }"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "black",
  },
  size: {
    type: String,
    default: "15",
  },
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  }
});
</script>

<style lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
