<template>
  <popup
    width="600"
    title="设置分类"
    ref="popupRef"
    @onclose="close"
    @onsubmit="submit"
    :loading="loading"
    loadingText="提交中..."
  >
    <el-form :model="formData" :rules="rule" ref="formRef">
      <el-form-item label="药品类别" prop="categoryIds">
        <el-select
          v-model="formData.categoryIds"
          multiple
          placeholder="请选择药品类别"
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="5"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.categoryId"
            :label="item.name"
            :value="item.categoryId"
            :disabled="medicineListHasCategory(item.categoryId)"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="warning">
      当前选择的药品中已存在部分或全部类别，系统已把该药品类别选项禁止!
    </div>
  </popup>
</template>

<script setup>
import { ref, defineExpose, defineEmits, onMounted } from "vue";
import {
  getMedicineCategoryList,
  setMedicineCategoryAPI,
} from "@/network/medicine";
const emits = defineEmits(["close", "success"]);
const popupRef = ref(null);
const formRef = ref(null);
const loading = ref(false);

const medicineList = ref([]);
const categoryList = ref([]);
const formData = ref({
  categoryIds: [],
});
const medicineListHasCategory = (categoryId) => {
  let result = false;
  medicineList.value.forEach((item) => {
    if (
      item.categoryNameList.map((item) => item.categoryId).includes(categoryId)
    ) result = true;
  });
  return result;
};

const rule = {
  categoryIds: [{ required: true, message: "请选择药品类别", trigger: "blur" }],
};
const open = async (items) => {
  medicineList.value = items;
  popupRef.value?.open();
};

const getCategoryList = async () => {
  const res = await getMedicineCategoryList();
  categoryList.value = res;
};

const submit = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        await setMedicineCategoryAPI({
          categoryIds: formData.value.categoryIds,
          idList: medicineList.value.map((item) => item.medicinesId),
        });
      } catch (error) {}
      loading.value = false;
      emits("success");
    }
  });
};

const close = () => {
  popupRef.value?.close();
  emits("close");
};

onMounted(() => {
  getCategoryList();
});
defineExpose({
  open,
  close,
});
</script>

<style lang="less" scoped>
.detail-wrapper {
  min-height: 200px;
  font-size: 14px;
  .detail-item {
    display: flex;
    padding: 5px 0px;
    .detail-label {
      width: 80px;
      text-align: right;
      padding-right: 10px;
    }
    .detail-value {
      font-weight: bold;
    }
  }
}
.warning {
  color: red;
}
</style>
