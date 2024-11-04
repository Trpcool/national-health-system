<template>
    <el-card>
        <template #header>
            <span>个人中心</span>
        </template>
        <div class="profile-container">
           <userInfoForm :userInfo="userInfo" />
        </div>
    </el-card>
</template>

<script setup>
import {computed} from 'vue'
import {useUserStore} from '@/store/modules/user'
import userInfoForm from './c-cmps/userInfoForm.vue';
const userStore = useUserStore()
const userInfo = computed(()=>userStore)

</script>

<style lang="less" scoped>
.profile-container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>