<template>
  <div class="data-plane">
    <div class="option">
      <p class="option-title">统计周期</p>
      <el-radio-group v-model="radio" size="large" style="width: 100%">
        <el-radio-button label="天" value="day" />
        <el-radio-button label="周" value="week" />
        <el-radio-button label="月" value="month" />
        <el-radio-button label="年" value="year" />
      </el-radio-group>
    </div>
    <div class="st-item">
      <p class="label">患者总数:</p>
      <el-statistic :value="total_patients" value-style="font-size: 30px">
        <template #prefix>
          <Icon style="padding-bottom: 11px" name="patient" size="16" />
        </template>
        <template #suffix> 人 </template>
      </el-statistic>
    </div>
    <div class="st-item">
      <p class="label">服务总数:</p>
      <el-statistic :value="total_services" value-style="font-size: 30px">
        <template #prefix>
          <div class="icon">
            <Icon style="padding-bottom: 11px" name="service" size="16" />
          </div>
        </template>
        <template #suffix> 人 </template>
      </el-statistic>
    </div>
    <div class="st-item">
      <p class="label">预约总数:</p>
      <el-statistic :value="total_appointments" value-style="font-size: 30px">
        <template #prefix>
          <Icon style="padding-bottom: 11px" name="predict" size="16" />
        </template>
        <template #suffix> 人 </template>
      </el-statistic>
    </div>
    <div class="st-item">
      <p class="label">签约总数:</p>
      <el-statistic :value="total_register" value-style="font-size: 30px">
        <template #prefix>
          <Icon style="padding-bottom: 11px" name="register" size="16" />
        </template>
        <template #suffix> 人 </template>
      </el-statistic>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { useTransition } from "@vueuse/core";
const radio = ref("day"); // 统计周期 day week month year
const props = defineProps({
  data: Object,
  default: () => ({
    patients: 0,
    services: 0,
    appointments: 0,
    register: 0,
  }),
});
watch(
  () => props.data,
  (val) => {
    totalPatients.value = val.patients;
    totalServices.value = val.services;
    totalAppointments.value = val.appointments;
    totalRegister.value = val.register;
  },
  { once: true }
);
const totalPatients = ref(0);
const totalServices = ref(0);
const totalAppointments = ref(0);
const totalRegister = ref(0);

const total_patients = useTransition(totalPatients, { duration: 1200 });
const total_services = useTransition(totalServices, { duration: 1200 });
const total_appointments = useTransition(totalAppointments, { duration: 1200 });
const total_register = useTransition(totalRegister, { duration: 1200 });
onMounted(() => {
  setTimeout(() => {
    totalPatients.value = 1000;
    totalServices.value = 1000;
    totalAppointments.value = 1000;
    totalRegister.value = 1000;
  }, 1500);
});
</script>

<style lang="less" scoped>
@import "@/assets/styles/them_var";
.data-plane {
  border: #cecece 1px solid;
  border-radius: 10px;
  flex: 1;
  padding: 20px;
  ::v-deep .el-radio-group {
    span {
      width: 130px;
    }
  }
  .option-title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 600;
    color: @themColor;
  }
  .st-item {
    margin: 15px 0px 10px 0px;
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .label {
    font-size: 20px;
    font-weight: 600;
    color: @themFontColor;
    .icon {
      position: relative;
      top: 10px;
    }
  }
}
</style>
