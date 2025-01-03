<template>
  <div class="options">
    <el-button type="primary" @click="handleOpenEdit(false)"
      >添加药房</el-button
    >
  </div>
  <el-table
    :data="props.list"
    v-loading="props.loading"
    lazy
    table-layout="auto"
    ref="tableRef"
  >
    <el-table-column prop="pharmacyName" label="药房名称"></el-table-column>
    <el-table-column prop="businessAddress" label="药房地址"> </el-table-column>
    <el-table-column prop="locationName" label="所在区域"></el-table-column>
    <el-table-column prop="phone" label="联系电话"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="founded" label="创建日期" width="100">
      <template #default="{ row }">
        {{ dateFormate(row.founded, "yyyy年MM月dd日") }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" @click="handleDetail(row.pharmacyId)" link
          >详情</el-button
        >
        <el-button type="info" @click="handleOpenEdit(row.pharmacyId)" link
          >编辑</el-button
        >
        <el-button type="danger" link @click="handleConfMedicine(row.pharmacyId)"
          >配药</el-button
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
</template>

<script setup>
import { defineProps, nextTick, ref, defineEmits, watch } from "vue";
import { dateFormate } from "@/utils";
import detail from "./detail.vue";
import edit from "./editMedicineRoom.vue";
import { useRouter } from "vue-router";

const router = useRouter();
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

const showSelect = ref(false);
const showDetail = ref(false);
const showEdit = ref(false);

watch(showSelect, (val) => {
  if (val) tableRef.value?.clearSelection();
});

const handleDetail = async (id) => {
  showDetail.value = true;
  await nextTick();
  dpRef.value?.open(id);
};

//id 为number类型 为false则为编辑模式
const handleOpenEdit = async (id) => {
  showEdit.value = true;
  await nextTick();
  editRef.value?.open(id);
};

// 切换配药也页面
const handleConfMedicine = (id) => {
  router.push(`medicine_conf/${id}`,
   );
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
