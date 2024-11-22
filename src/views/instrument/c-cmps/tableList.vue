<template>
  <div class="table-wrapper">
    <div class="options">
      <el-button type="primary" @click="openEdit(null)">添加</el-button>
      <el-button type="info" @click="showSelect = !showSelect">{{
        showSelect ? "取消操作" : "批量操作"
      }}</el-button>
      <!-- 批量操作 -->
      <transition-group name="list">
        <el-button type="success" v-if="showSelect" @click="openSetCategory"
          >设置分类</el-button
        >
        <el-button
          type="danger"
          v-if="showSelect"
          @click="handleDel(selectedItems.map((item) => item.instrumentId))"
          >药品删除</el-button
        >
      </transition-group>
    </div>
    <el-table
      :data="list"
      v-loading="loading"
      lazy
      table-layout="auto"
      ref="tableRef"
      @selection-change="(list) => (selectedItems = list)"
    >
      <el-table-column
        type="selection"
        v-if="showSelect"
        :selectable="selectable"
      />
      <el-table-column prop="urlList" label="器械图片">
        <template #default="scope">
          <pre-image
            width="100"
            height="100"
            :url="scope.row.urlList"
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="器械名称"></el-table-column>
      <el-table-column prop="categoryNameList" label="分类">
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
      <el-table-column prop="batchNumber" label="器械批号"></el-table-column>
      <el-table-column prop="modelNumber" label="规格"></el-table-column>
      <el-table-column
        prop="serialNumber"
        label="序列号"
        width="100"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="openDetail(row.instrumentId)" link
            >详情</el-button
          >
          <el-button type="info" @click="openEdit(row.instrumentId)" link
            >编辑</el-button
          >
          <el-button type="danger" @click="handleDel(row.instrumentId)" link
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <detail-popup
      v-if="showDetail"
      ref="detailRef"
      @close="showDetail = false"
    />
    <edit-popup
      v-if="showEdit"
      ref="editRef"
      @close="showEdit = false"
      @success="
        () => {
          emits('refresh');
          showEdit = false;
        }
      "
    />
    <set-category-popup
      v-if="showSetCategory"
      ref="scRef"
      @success="
        () => {
          emits('refresh');
          showSetCategory = false;
        }
      "
      @close="showSetCategory = false"
    />
  </div>
</template>

<script setup>
import { nextTick, ref, defineProps, watch } from "vue";
import { deleteInstrumentAPI } from "@/network/instrument";
import feedback from "@/utils/feedback";
import detailPopup from "./detail.vue";
import editPopup from "./edit.vue";
import setCategoryPopup from "./setCategory.vue";
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
const detailRef = ref(null);
const editRef = ref(null);
const scRef = ref(null);

const showSelect = ref(false);
const selectedItems = ref([]);
const showDetail = ref(false);
const showEdit = ref(false);
const showSetCategory = ref(false);
const openDetail = async (id) => {
  showDetail.value = true;
  await nextTick();
  detailRef.value.open(id);
};
const openEdit = async (id) => {
  showEdit.value = true;
  await nextTick();
  editRef.value.open(id);
};
const openSetCategory = async () => {
  if (!selectedItems.value.length) return feedback.msgWarning("请选择设置项");
  showSetCategory.value = true;
  await nextTick();
  scRef.value.open(selectedItems.value);
};
watch(showSelect, (val) => {
  if (val) tableRef.value?.clearSelection();
});

const handleDel = async (ids) => {
  if (!Array.isArray(ids)) ids = [ids];
  if (!ids.length) return feedback.msgWarning("请选择删除项");
  await feedback.confirm(
    ids.length === 1 ? "确定删除?" : `确定删除所选的${ids.length}条数据吗?`
  );
  await deleteInstrumentAPI(ids);
  emits("refresh");
};
</script>

<style lang="less" scoped>
.options {
  margin: 10px 0px;
  display: flex;
  .select-options {
    margin-left: 12px;
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
