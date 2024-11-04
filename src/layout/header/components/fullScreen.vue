<template>
    <el-icon class="icon" @click="handClick"><FullScreen /></el-icon>
</template>

<script setup>
import { ref } from 'vue'
import { FullScreen } from '@element-plus/icons-vue'
const isFullScreen = ref(false)
// 读取是不是全屏模式
const isFullScreenMode = () => {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement
}
console.log(isFullScreenMode())
const openFullScreen = (el) => {
    console.log('openFullScreen')
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
    isFullScreen.value = true
}

const closeFullScreen = (el) => {
    document.exitFullscreen()
    isFullScreen.value = false
}
const handClick = () => {
    const el = document.documentElement
    isFullScreen.value ? closeFullScreen(el) : openFullScreen(el)
}

    
</script>

<style lang="less" scoped>
.icon{
    cursor: pointer;
}
</style>