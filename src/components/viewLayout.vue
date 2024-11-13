<template>
  <div class="medicine-content">
    <el-card style="margin-bottom: 10px" shadow="never">
      <slot name="query-header"></slot>
    </el-card>
    <el-card shadow="never">
      <div class="options">
        <el-button type="primary" v-if="addText" @click="() => emits('add')">{{
          addText
        }}</el-button>
        <el-button
          type="info"
          v-if="!disabledSelect"
          @click="showSelect = !showSelect"
          >{{ showSelect ? "取消操作" : "批量操作" }}</el-button
        >
        <!-- 批量操作 -->
        <transition-group name="list">
          <div class="select-options" v-if="showSelect">
            <slot name="options"></slot>
          </div>
        </transition-group>
      </div>
      <el-table
        :data="pager.list"
        v-loading="pager.loading"
        lazy
        table-layout="auto"
        ref="tableRef"
        @selection-change="(e) => emits('selectChange', e)"
      >
        <el-table-column
          type="selection"
          v-if="showSelect"
          :selectable="selectable"
        />
        <slot name="table"></slot>
      </el-table>
      <pagination v-model="pager" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
const props = defineProps({
  // 绑定pager
  modelValue: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20, 30, 50],
      total: 0,
      list: [],
      loading: false,
    }),
  },
  //是否禁用选项
  selectable: {
    type: Function,
    default: () => true,
  },
  // 添加按钮
  addText: {
    type: [String, Boolean],
    default: "添加",
  },
  // 是否禁用批量操作
  disabledSelect: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue", "add", "selectChange"]);

const showSelect = ref(false);

const pager = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});
</script>

<style lang="less" scoped>
.medicine-content {
  position: relative;
  width: 100%;
  .options {
    margin: 10px 0px;
    display: flex;
    .select-options {
      margin-left: 12px;
    }
  }
  ::v-deep .el-table__cell {
    z-index: auto; /*初始化z-index层叠上下文（z-index:0），防止与盒子内部的z-index属性的盒子层级有冲突*/
  }
  .list-enter-active {
    transition: all 0.5s ease;
  }
  .list-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
