<template>
  <popup
    :title="title"
    ref="popupRef"
    width="700"
    @onclose="close"
    :loading="loading"
    loadingText="信息提交中..."
    @onsubmit="submit"
  >
    <div class="form-wrapper">
      <el-form :model="categoryForm" ref="formRef" :rules="rules">
        <el-form-item label="药品分类" prop="name">
          <el-input placeholder="请输入分类名称" v-model="categoryForm.name" />
        </el-form-item>
      </el-form>
    </div>
  </popup>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import { addCategoryAPI, updateCategoryAPI } from "@/network/medicine_category";

const emits = defineEmits(["close", "success"]);
const title = ref("添加分类");
const popupRef = ref(null);
const formRef = ref(null);
const loading = ref(false);
const categoryForm = ref({
  categoryId: "", //药品id，无id-新增 有id-编辑
  name: "", //药品名称
});

const rules = {
  name: [{ required: true, message: "请输入药品药品分类", trigger: "blur" }],
};

//携带药品id参数则是编辑模式携带id数据请求回显
const open = async (row) => {
  popupRef.value?.open();
  if (!row.categoryId) return;
  title.value = "编辑分类";
  categoryForm.value.categoryId = row.categoryId;
  categoryForm.value.name = row.name;
};

const submit = async () => {
  formRef.value?.validate(async (validate) => {
    if (validate) {
      loading.value = true;
      try {
        if (categoryForm.value.categoryId) {
          // 编辑
          await updateCategoryAPI(categoryForm.value);
        } else {
          // 新增
          await addCategoryAPI({ name: categoryForm.value.name });
        }
        popupRef.value?.close();
        emits("success");
      } catch {
      } finally {
        loading.value = false;
      }
    }
  });
};

const close = () => {
  popupRef.value?.close();
  emits("close");
};

defineExpose({
  open,
});
</script>

<style lang="less" scoped>
.form-wrapper {
  padding: 10px 20px;
}
</style>
