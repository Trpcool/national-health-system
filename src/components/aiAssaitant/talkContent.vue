<template>
  <div class="talk-content" ref="talkContentRef">
    <div
      class="talk-content-item"
      v-for="item of props.contentList"
      :class="item.type === 'ai' ? 'ai' : 'user'"
      :key="item.id"
    >
      <div class="avatar">
        <el-avatar
          :size="35"
          :src="item.type === 'ai' ? aiAvatar : userStore.avatar"
        />
      </div>
      <p :class="item.type === 'ai' ? 'msg ai-content' : 'msg user-content'">
        {{ item.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick, watch } from "vue";
import { useUserStore } from "@/store/modules/user";
import aiAvatar from "../../assets/ai/ai.svg";

const userStore = useUserStore();
const talkContentRef = ref();

const props = defineProps({
  contentList: {
    type: Array,
    default: () => [
      // {
      //   id: 1,
      //   type: "user",
      //   content: "这是用户的问题",
      // },
      // {
      //   id: 2,
      //   type: "ai",
      //   content: "这是一段回复的答案",
      // },
    ],
  },
});

watch(
  () => props.contentList,
  () => {
    toBottom();
  },
  {
    deep: true,
  }
);
function toBottom() {
  nextTick(() => {
    talkContentRef.value.scrollTop = talkContentRef.value.scrollHeight;
  });
}

defineExpose({ toBottom });
</script>

<style lang="less" scoped>
.talk-content {
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.talk-content-item {
  display: flex;
  .msg {
    background: white;
    box-shadow: 1px 1px 8px 1px #66666645;
    border-radius: 10px;
    font-size: 16px;
    padding: 8px;
    max-width: 400px;
    height: fit-content;
    margin-top: 20px;
    word-wrap: break-word;
    margin-bottom: 20px;
    color: #666;
  }
  .ai {
    display: flex;
  }

  .avatar {
    margin: 10px;
  }
}
.user {
  flex-direction: row-reverse;
}
</style>
