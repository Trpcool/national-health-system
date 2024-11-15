<template>
  <div class="options">
    <el-button type="primary" @click="handleOpenEdit(false)"
      >添加药品</el-button
    >
    <el-button type="info" @click="showSelect = !showSelect">{{
      showSelect ? "取消操作" : "批量操作"
    }}</el-button>
    <transition-group name="list">
      <el-button type="success" v-if="showSelect" @click="handleSetCategory"
        >设置分类</el-button
      >
      <el-button
        type="danger"
        v-if="showSelect"
        @click="handleDel(selectedItems.map((item) => item.medicinesId))"
        >药品删除</el-button
      >
    </transition-group>
  </div>
  <el-table
    :data="props.list"
    v-loading="props.loading"
    lazy
    table-layout="auto"
    ref="tableRef"
    @selection-change="(list)=> selectedItems = list"
  >
    <el-table-column
      v-if="showSelect"
      type="selection"
      :selectable="selectable"
    />
    <el-table-column prop="img" label="封装图">
      <template #default="scope">
        <pre-image
          width="100"
          height="100"
          :url="scope.row.img"
          fit="contain"
        />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="药品名称"></el-table-column>
    <el-table-column prop="categoryName" label="分类">
      <template #default="scope">
        <el-tag
          v-for="item in scope.row.categoryNameList"
          :key="item"
          style="margin: 2px"
          >{{ item.name }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="manufacturer" label="生产商"></el-table-column>
    <el-table-column prop="productionNum" label="生产编号"></el-table-column>
    <el-table-column prop="specification" label="数量"></el-table-column>
    <el-table-column
      prop="unitPrice"
      label="价格"
      width="100"
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" @click="handleDetail(row.medicinesId)" link
          >详情</el-button
        >
        <el-button type="info" @click="handleOpenEdit(row.medicinesId)" link
          >编辑</el-button
        >
        <el-button type="danger" @click="handleDel(row.medicinesId)" link
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <detail v-if="showDetail" ref="dpRef" @close="showDetail = false" />
  <edit
    v-if="showEdit"
    @close="showEdit = false"
    @success="handleEditSuccess"
    ref="editRef"
  />
  <set-category
    v-if="showSetCategory"
    @close="showSetCategory = false"
    @success="handleSetCateSuccess"
    ref="scRef"
  />
</template>

<script setup>
import { defineProps, nextTick, ref, defineEmits, watch } from "vue";
import feedback from "@/utils/feedback";
import { deleteMedicineAPI } from "@/network/medicine";
import detail from "./detail.vue";
import edit from "./editMedicine.vue";
import setCategory from "./setCategoryPopup.vue";

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

const tableRef = ref(null);
const dpRef = ref(null);
const editRef = ref(null);
const scRef = ref(null);

const showSelect = ref(false);
const selectedItems = ref([]);
const showDetail = ref(false);
const showEdit = ref(false);
const showSetCategory = ref(false);

watch(showSelect, (val) => {
  if (val) tableRef.value?.clearSelection();
});
const selectable = () => {
  return showSelect.value;
};

const handleDetail = async (id) => {
  showDetail.value = true;
  await nextTick();
  dpRef.value?.open(id);
};

const handleDel = async (ids) => {
  if (!Array.isArray(ids)) ids = [ids];
  if (!ids.length) return feedback.msgWarning("请选择删除项");
  await feedback.confirm(
    ids.length === 1 ? "确定删除?" : `确定删除所选的${ids.length}条数据吗?`
  );
  await deleteMedicineAPI({ ids });
  emits("refresh");
};

const handleSetCategory = async () => {
  if (!selectedItems.value.length) return feedback.msgWarning("请选择设置项");
  showSetCategory.value = true;
  await nextTick();
  scRef.value?.open(selectedItems.value);
};

//id 为number类型 为false则为编辑模式
const handleOpenEdit = async (id) => {
  showEdit.value = true;
  await nextTick();
  editRef.value?.open(id);
};

const handleEditSuccess = () => {
  showEdit.value = false;
  emits("refresh");
};

const handleSetCateSuccess = () => {
  showSetCategory.value = false;
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
