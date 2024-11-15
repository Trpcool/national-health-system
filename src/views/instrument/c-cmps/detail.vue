<template>
  <popup
    width="700"
    title="器械详情"
    ref="popupRef"
    :confirmText="false"
    cancelText="返回"
    @onclose="close"
  >
    <div class="detail-wrapper" v-loading="loading">
      <div class="detail-item">
        <div class="detail-label">器械图片</div>
        <div class="detail-value">
          <pre-image :url="instrumentDetail.urlList" />
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">名称</div>
        <div class="detail-value">
          {{ instrumentDetail.name }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">器械类别</div>
        <div class="detail-value">
          <el-tag
            v-for="item in instrumentDetail.categoryNameList"
            :key="item"
            style="margin: 2px"
            >{{ item.name }}</el-tag
          >
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">生产商</div>
        <div class="detail-value">
          {{ instrumentDetail.manufacturer }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">生产批号</div>
        <div class="detail-value">
          {{ instrumentDetail.serialNumber }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">生产批号</div>
        <div class="detail-value">
          {{ instrumentDetail.modelNumber }}
        </div>
      </div>
      <div class="detail-item">
        <div class="detail-label">单价</div>
        <div class="detail-value">
          {{ instrumentDetail.unitPrice }}
        </div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import { ref, defineExpose, defineEmits } from "vue";
import { getInstrumentDetailAPI } from "@/network/instrument";
import { dateFormate } from "@/utils";

const emits = defineEmits(["close"]);

const popupRef = ref(null);
const loading = ref(false);
const instrumentDetail = ref({});

const open = async (id) => {
  popupRef.value?.open();
  loading.value = true;
  const res = await getInstrumentDetailAPI(id);
  instrumentDetail.value = res;
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
