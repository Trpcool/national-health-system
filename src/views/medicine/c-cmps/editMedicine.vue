<template>
  <popup
    :title="title"
    ref="popupRef"
    @onclose="close"
    :loading="loading"
    :loadingText="loadingText"
    @onsubmit="submit"
  >
    <div class="form-wrapper">
      <el-form :model="medicineForm" ref="formRef" :rules="rules">
        <el-form-item label="药品图片" prop="img">
          <upload
            model="preview"
            :showTips="true"
            ref="uploadRef"
            v-model="medicineForm.img"
            @clipped="medicineForm.img = 'pass'"
          />
        </el-form-item>
        <el-form-item label="药品名称" prop="name">
          <el-input placeholder="请输入药品名称" v-model="medicineForm.name" />
        </el-form-item>
        <el-form-item label="药品类别" prop="categoryIds">
          <el-select
            v-model="medicineForm.categoryIds"
            multiple
            placeholder="请选择药品类别"
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.categoryId"
              :label="item.name"
              :value="item.categoryId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="药品产家" prop="manufacturer">
          <el-input
            placeholder="请选输入药品产家"
            v-model="medicineForm.manufacturer"
          />
        </el-form-item>
        <el-form-item label="药品规格" prop="specification">
          <el-input
            placeholder="请选输入药品规格"
            v-model="medicineForm.specification"
          />
        </el-form-item>
        <el-form-item label="药品单价" prop="unitPrice">
          <el-input
            placeholder="请选输入药品单价"
            v-model="medicineForm.unitPrice"
            type="number"
          />
        </el-form-item>
        <el-form-item label="生产批号" prop="productionNum">
          <el-input
            placeholder="请选输入生产批号"
            v-model="medicineForm.productionNum"
          />
        </el-form-item>
        <el-form-item label="生产日期" prop="productionDate">
          <el-date-picker
            v-model="medicineForm.productionDate"
            type="date"
            placeholder="请选择生产日期"
            size="default"
          />
        </el-form-item>
        <el-form-item label="过期日期" prop="expiryDate">
          <el-date-picker
            v-model="medicineForm.expiryDate"
            type="date"
            placeholder="请选择过期日期"
            size="default"
            :disabledDate="disabledDate"
          />
        </el-form-item>
      </el-form>
    </div>
  </popup>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import {
  getMedicineCategoryList,
  updateMedicineAPI,
  addMedicineAPI,
  getMedicineDetailAPI,
} from "@/network/medicine";
import { removeNullProps } from "@/utils";

const emits = defineEmits(["close", "success"]);
const title = ref("添加药品");
const popupRef = ref(null);
const uploadRef = ref(null);
const formRef = ref(null);
const loading = ref(false);
const loadingText = ref("图片上传中...");
const categoryList = ref([]);
const medicineForm = ref({
  medicinesId: "", //药品id，无id-新增 有id-编辑
  name: "", //药品名称
  img: "", //药品图片
  categoryIds: [], //分类
  manufacturer: "", //生产厂家
  productionDate: "", //生产日期
  expiryDate: "", //过期日期
  productionNum: "", //生产批号
  specification: "", //规格
  unitPrice: "", //单价
});

// 过期日期不能小于生产日期
const disabledDate = (time) => {
  return time.getTime() < new Date(medicineForm.value.productionDate).getTime();
};
const validateExpireDate = (rule, value, callback) => {
  if (
    new Date(value).getTime() <
    new Date(medicineForm.value.productionDate).getTime()
  ) {
    callback(new Error("过期日期不能小于生产日期"));
  }
  callback();
};
const rules = {
  name: [{ required: true, message: "请输入药品名称", trigger: "blur" }],
  img: [{ required: true, message: "请上传药品图片", trigger: "blur" }],
  categoryIds: [{ required: true, message: "请选择药品类别", trigger: "blur" }],
  manufacturer: [
    { required: true, message: "请输入生产厂家", trigger: "blur" },
  ],
  productionDate: [
    { required: true, message: "请选择生产日期", trigger: "blur" },
  ],
  expiryDate: [
    { required: true, message: "请选择过期日期", trigger: "blur" },
    {
      validator: validateExpireDate,
      trigger: "blur",
    },
  ],
  productionNum: [
    { required: true, message: "请输入生产批号", trigger: "blur" },
  ],
  specification: [{ required: true, message: "请输入规格", trigger: "blur" }],
  unitPrice: [
    { required: true, message: "请输入单价", trigger: "blur" },
  ],
};
const getCategoryList = async () => {
  const res = await getMedicineCategoryList();
  categoryList.value = res;
};

//携带药品id参数则是编辑模式携带id数据请求回显
const open = async (id) => {
  popupRef.value?.open();
  getCategoryList();
  if (!id) return;
  title.value = "编辑药品";
  const { categoryNameList, ...obj } = await getMedicineDetailAPI(id);
  medicineForm.value.categoryIds = categoryNameList.map(
    (item) => item.categoryId
  );
  Object.assign(medicineForm.value, obj);
};

const readyUploadImg = async () => {
  if (!medicineForm.value.img) return Promise.resolve();
  loading.value = true;
  loadingText.value = "图片上传中...";
  await uploadRef.value?.startUpload();
  loading.value = false;
  return Promise.resolve();
};

const submit = async () => {
  formRef.value?.validate(async (validate) => {
    if (validate) {
      // 上传图片
      await readyUploadImg();
      loadingText.value = "信息提交中...";
      loading.value = true;
      if (!!medicineForm.value.medicinesId) {
        // 修改
        await updateMedicineAPI(removeNullProps(medicineForm.value));
      } else {
        // 新增
        await addMedicineAPI(removeNullProps(medicineForm.value));
      }
      loading.value = false;
      popupRef.value?.close();
      emits("success");
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
