<template>
  <div class="options">
    <el-button type="primary" @click="handleOpenEdit({ category: null })"
      >添加分类</el-button
    >
  </div>
  <el-table
    :data="props.list"
    v-loading="props.loading"
    lazy
    table-layout="auto"
  >
    <el-table-column label="创建时间" width="200px">
      <template #default="{ row }">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">
          {{ row.createdTime }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="药品分类名称">
      <template #default="{ row }">
        <el-tag> {{ row.name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="right">
      <template #default="{ row }">
        <el-button type="info" @click="handleOpenEdit(row)" link
          >编辑</el-button
        >
        <el-button type="danger" @click="handleDel(row.categoryId)" link
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <edit
    v-if="showEdit"
    @close="showEdit = false"
    @success="handleEditSuccess"
    ref="editRef"
  />
</template>

<script setup>
import { defineProps, nextTick, ref, defineEmits } from "vue";
import feedback from "@/utils/feedback";
import { deleteCategoryAPI } from "@/network/instrument_category";
import edit from "./editMCategroy.vue";
import { Timer } from "@element-plus/icons-vue";
// import { createColorList } from "@/utils";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["refresh"]);

// watchEffect(()=>{
//    const colorList = createColorList(props.list.length);
// })
const editRef = ref(null);

const showEdit = ref(false);

const handleDel = async (id) => {
  await feedback.confirm("确定删除?");
  await deleteCategoryAPI(id);
  emits("refresh");
};

//id 为number类型 为false则为编辑模式
const handleOpenEdit = async (row) => {
  showEdit.value = true;
  await nextTick();
  editRef.value?.open(row);
};

const handleEditSuccess = () => {
  showEdit.value = false;
  emits("refresh");
};
</script>

<style lang="less" scoped>
.options {
  margin: 10px 0px;
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
</style>
