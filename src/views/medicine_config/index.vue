<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <el-button type="primary" @click="router.back()">返回</el-button>
      </template>
      <div>
        <medicineRoomInfo :id="route.params.id"/>
        <MedicineConf :id="route.params.id"/>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import MedicineConf from "./c-cmps/medicineConf.vue";
import medicineRoomInfo from "./c-cmps/medicineRoomInfo.vue";
const router = useRouter();
const route = useRoute();
console.log(route.params.id);
</script>

<style lang="less" scoped></style>
