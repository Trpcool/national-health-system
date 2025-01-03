<template>
  <div style="text-align: center">
    <el-transfer
      v-model="rightValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['药品库', '当前药房库']"
      :button-texts="['下架', '分配']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #default="{ option }">
        <span>{{ option.key }} - {{ option.label }}</span>
      </template>
      <template #left-footer>
        <div style="padding: 10px">
          <el-select
            v-model="value1"
            multiple
            placeholder="请选择药品类别"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </template>
    </el-transfer>
  </div>
</template>

<script setup>
import { ref } from "vue";
const generateData = () => {
  const data = [];
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    });
  }
  return data;
};

const value1 = ref([]);
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

const data = ref(generateData());
const rightValue = ref([]);

const handleChange = (value, direction, movedKeys) => {
  console.log(value, direction, movedKeys);
};
</script>

<style lang="less" scoped>
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
::v-deep .el-transfer {
  --el-transfer-panel-width: 48.2rem;
  --el-transfer-panel-header-height: 3.5rem;
  --el-transfer-panel-footer-height: 3.5rem;
  --el-transfer-panel-body-height: 30.5rem;
}
</style>
