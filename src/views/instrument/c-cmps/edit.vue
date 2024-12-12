<template>
  <popup
    :title="title"
    ref="popupRef"
    width="700"
    @onclose="close"
    :loading="loading"
    :loadingText="loadingText"
    @onsubmit="submit"
  >
    <div class="form-wrapper">
      <el-form
        :model="instrumentForm"
        ref="formRef"
        label-width="80"
        :rules="rules"
      >
        <el-form-item label="器械图片" prop="imgUrlList">
          <multiplyUpload ref="uploadRef" v-model="instrumentForm.imgUrlList" />
        </el-form-item>
        <el-form-item label="器械名称" prop="name">
          <el-input
            placeholder="请输入器械名称"
            v-model="instrumentForm.name"
          />
        </el-form-item>
        <el-form-item label="器械类别" prop="categoryIdList">
          <el-select
            v-model="instrumentForm.categoryIdList"
            multiple
            placeholder="请选择器械类别"
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
        <el-form-item label="器械产家" prop="manufacturer">
          <el-input
            placeholder="请选输入器械产家"
            v-model="instrumentForm.manufacturer"
          />
        </el-form-item>
        <el-form-item label="器械规格" prop="modelNumber">
          <el-input
            placeholder="请选输入器械规格"
            v-model="instrumentForm.modelNumber"
          />
        </el-form-item>
        <el-form-item label="器械单价" prop="unitPrice">
          <el-input
            placeholder="请输入器械单价"
            v-model="instrumentForm.unitPrice"
            type="number"
          />
        </el-form-item>
        <el-form-item label="生产批号" prop="batchNumber">
          <el-input
            placeholder="请选输入生产批号"
            v-model="instrumentForm.batchNumber"
          />
        </el-form-item>
        <el-form-item label="序列号" prop="serialNumber">
          <el-input
            placeholder="请选输入序列号"
            v-model="instrumentForm.serialNumber"
          />
        </el-form-item>
      </el-form>
    </div>
  </popup>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import {
  getInstrumentCategoryListAPI,
  updateInstrumentAPI,
  addInstrumentAPI,
  getInstrumentDetailAPI,
} from "@/network/instrument";
import { removeNullProps } from "@/utils";

const emits = defineEmits(["close", "success"]);
const title = ref("添加器械");
const popupRef = ref(null);
const uploadRef = ref(null);
const formRef = ref(null);
const loading = ref(false);
const loadingText = ref("图片上传中...");
const categoryList = ref([]);
const instrumentForm = ref({
  batchNumber: "", //器械批号
  categoryIdList: [], //器械类别
  imgUrlList: [], //图片列表
  instrumentId: 0, //器械id
  manufacturer: "", //生产商
  modelNumber: "", //规格
  name: "", //名称
  unitPrice: "", //单价
  serialNumber: "", //序列号
});

const rules = {
  batchNumber: [{ required: true, message: "请输入器械批号", trigger: "blur" }],
  name: [{ required: true, message: "请输入器械名称", trigger: "blur" }],
  imgUrlList: [{ required: true, message: "请上传器械图片", trigger: "blur" }],
  categoryIdList: [
    { required: true, message: "请选择器械类别", trigger: "blur" },
  ],
  manufacturer: [
    { required: true, message: "请输入器械产家", trigger: "blur" },
  ],
  modelNumber: [{ required: true, message: "请输入生产批号", trigger: "blur" }],
  serialNumber: [{ required: true, message: "请输入规格", trigger: "blur" }],
  unitPrice: [{ required: true, message: "请输入单价", trigger: "blur" }],
};
const getCategoryList = async () => {
  const res = await getInstrumentCategoryListAPI();
  categoryList.value = res;
};

//携带药品id参数则是编辑模式携带id数据请求回显
const open = async (id) => {
  popupRef.value?.open();
  getCategoryList();
  if (!id) return;
  title.value = "编辑器械";
  const { categoryNameList, urlList, ...obj } = await getInstrumentDetailAPI(
    id
  );
  instrumentForm.value.categoryIdList = categoryNameList.map(
    (item) => item.categoryId
  );
  Object.assign(instrumentForm.value, obj, { imgUrlList: urlList });
};

const readyUploadImg = async () => {
  if (!instrumentForm.value.img) return Promise.resolve();
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
      if (!!instrumentForm.value.instrumentId) {
        // 修改
        await updateInstrumentAPI(removeNullProps(instrumentForm.value));
      } else {
        // 新增
        await addInstrumentAPI(removeNullProps(instrumentForm.value));
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
