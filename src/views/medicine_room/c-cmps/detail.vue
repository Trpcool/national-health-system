<template>
  <popup
    width="700"
    title="药品详情"
    ref="popupRef"
    :confirmText="false"
    cancelText="返回"
    @onclose="close"
  >
    <div class="detail-wrapper" v-loading="loading">
      <div class="detail-item">
        <div class="detail-label">封装图</div>
        <div class="detail-value">
          <pre-image :url="medicineDetail.img" />
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">名称</div>
        <div class="detail-value">
          {{ medicineDetail.name }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">药品类别</div>
        <div class="detail-value">
          <el-tag
            v-for="item in medicineDetail.categoryNameList"
            :key="item"
            style="margin: 2px"
            >{{ item.name }}</el-tag
          >
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">生产商</div>
        <div class="detail-value">
          {{ medicineDetail.manufacturer }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">数量</div>
        <div class="detail-value">
          {{ medicineDetail.specification }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">单价</div>
        <div class="detail-value">
          {{ medicineDetail.unitPrice }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">生产日期</div>
        <div class="detail-value">
          {{ formateDate(medicineDetail.productionDate) }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">过期时间</div>
        <div class="detail-value">
          {{ formateDate(medicineDetail.expiryDate) }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">生产编号</div>
        <div class="detail-value">
          {{ medicineDetail.productionNum }}
        </div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import { getMedicineDetailAPI } from "@/network/medicine";
import { dateFormate } from "@/utils";

const emits = defineEmits(["close"]);

const popupRef = ref(null);
const loading = ref(false);
const medicineDetail = ref({});

const open = async (id) => {
  popupRef.value?.open();
  loading.value = true;
  const res = await getMedicineDetailAPI(id);
  medicineDetail.value = res;
  loading.value = false;
};

const formateDate = (date) => dateFormate(date, "yyyy年MM月dd日");
const close = () => {
  popupRef.value?.close();
  emits("close");
};
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
</style>
