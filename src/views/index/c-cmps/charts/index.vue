<template>
    <div class="charts-container">
        <ratioCharts/>
        <barCharts/>
    </div>
  </template>
  
  <script setup>
  import ratioCharts from './ratioCharts.vue'
  import barCharts from './barCharts.vue';
  </script>
  
  <style lang="less" scoped>
 .charts-container {
    margin-top: 20px;
  }
  </style>
  