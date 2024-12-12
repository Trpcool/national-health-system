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
        label-width="85"
        :model="medicineForm"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="药房名称" prop="pharmacyName">
          <el-input
            placeholder="请输入药房名称"
            v-model="medicineForm.pharmacyName"
          />
        </el-form-item>
        <el-form-item label="所属省" prop="provinceId">
          <el-select
            v-model="medicineForm.provinceId"
            placeholder="请选择所属省"
            @change="(targetId) => getLocationOptions(1, targetId)"
          >
            <el-option
              v-for="item in provinceOptions"
              :key="item.reviewId"
              :label="item.name"
              :value="item.reviewId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属市" prop="cityId" v-if="cityOptions.length">
          <el-select
            v-model="medicineForm.cityId"
            placeholder="请选择所属市"
            @change="(targetId) => getLocationOptions(2, targetId)"
          >
            <el-option
              v-for="item in cityOptions"
              :key="item.cityId"
              :label="item.name"
              :value="item.cityId"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属区"
          prop="districtId"
          v-if="districtOptions.length"
        >
          <el-select
            v-model="medicineForm.districtId"
            placeholder="请选择所诉区"
          >
            <el-option
              v-for="item in districtOptions"
              :key="item.districtId"
              :label="item.name"
              :value="item.districtId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="businessAddress">
          <el-input
            placeholder="请选输入药房地址"
            v-model="medicineForm.businessAddress"
          />
        </el-form-item>
        <el-form-item label="负责人账号" prop="username">
          <el-input
            placeholder="请选输入负责人账号"
            v-model="medicineForm.username"
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            placeholder="请选输入联系电话"
            v-model="medicineForm.phone"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请选输入邮箱" v-model="medicineForm.email" />
        </el-form-item>
        <el-form-item label="营业执照代码" prop="licenseNum">
          <el-input
            v-model="medicineForm.licenseNum"
            placeholder="请输入营业执照代码"
          />
        </el-form-item>
        <el-form-item label="成立日期" prop="founded">
          <el-date-picker
            v-model="medicineForm.founded"
            type="date"
            placeholder="请选择过期日期"
            size="default"
          />
        </el-form-item>
      </el-form>
    </div>
  </popup>
</template>

<script setup>
import { ref, defineExpose, defineEmits, onMounted } from "vue";
import {
  getProvinceListAPI,
  getCityListAPI,
  getAreaListAPI,
} from "@/network/location_manage";
import {
  addMedicineRoomAPI,
  updateMedicineRoomAPI,
} from "@/network/medicine_room";
import { removeNullProps } from "@/utils";

const emits = defineEmits(["close", "success"]);
const title = ref("添加药房");
const popupRef = ref(null);
const formRef = ref(null);
const loading = ref(false);
const loadingText = ref("图片上传中...");

const provinceOptions = ref([]);
const cityOptions = ref([]);
const districtOptions = ref([]);

const getLocationOptions = async (locationType = 0, id = null) => {
  switch (locationType) {
    case 0:
      try {
        provinceOptions.value = await getProvinceListAPI();
      } catch (error) {
        provinceOptions.value = [];
      }
      break;
    case 1:
      try {
        medicineForm.value.cityId = "";
        const res = await getCityListAPI(id);
        cityOptions.value = res || [];
      } catch (error) {
        cityOptions.value = [];
      }
      break;
    case 2:
      try {
        medicineForm.value.districtId = "";
        districtOptions.value = await getAreaListAPI(id);
      } catch (error) {
        districtOptions.value = [];
      }
  }
};
onMounted(() => getLocationOptions());

const medicineForm = ref({
  provinceId: "", //药房id
  pharmacyName: "", //药房名称
  provinceId: "", //省
  cityId: "", //市
  districtId: "", //区
  username: "", //药房负责人账号
  phone: "", //联系人电话
  email: "", //邮箱
  licenseNum: "", //营业执照
  founded: "", //创建时间
  businessAddress: "", //地址
});

const rules = {
  pharmacyName: [
    { required: true, message: "请输入药房名称", trigger: "blur" },
  ],
  provinceId: [{ required: true, message: "请选择省", trigger: "blur" }],
  cityId: [{ required: true, message: "请选择市", trigger: "blur" }],
  districtId: [{ required: true, message: "请选择市", trigger: "blur" }],
  username: [{ required: true, message: "请输入负责人姓名", trigger: "blur" }],
  phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  licenseNum: [{ required: true, message: "请输入营业执照", trigger: "blur" }],
  founded: [{ required: true, message: "请选择企业创建日期", trigger: "blur" }],
  businessAddress: [{ required: true, message: "请输入地址", trigger: "blur" }],
};

//携带药品id参数则是编辑模式携带id数据请求回显
const open = async (id) => {
  console.log(id);
  popupRef.value?.open();
  if (!id) return;
  title.value = "编辑药房";
 
  // const { categoryNameList, ...obj } = await getMedicineDetailAPI(id);
  // medicineForm.value.categoryIds = categoryNameList.map(
  //   (item) => item.categoryId
  // );
  // Object.assign(medicineForm.value, obj);
};

const submit = async () => {
  formRef.value?.validate(async (validate) => {
    if (validate) {
      loadingText.value = "信息提交中...";
      loading.value = true;

      if (!!medicineForm.value.pharmacyId) {
        // 修改
        await updateMedicineRoomAPI(removeNullProps(medicineForm.value));
      } else {
        // 新增
        await addMedicineRoomAPI(removeNullProps(medicineForm.value));
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
