<template>
        <el-icon @click="handleRefresh" class="icon"><Refresh /></el-icon>
</template>

<script setup >

import { Refresh } from '@element-plus/icons-vue';
import { useAppStore } from '@/store/modules/app';
const appStore = useAppStore();

const handleRefresh = () => {
    appStore.refreshPage()
}

</script>

<style lang="less" scoped>
.icon{
    cursor: pointer;
    font-size: 20px;
}
</style>