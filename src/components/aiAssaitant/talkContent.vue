<template>
  <div class="talk-content" ref="talkContentRef">
    <div v-for="item of props.contentList" :key="item.id">
      <div class="talk-content-item" :class="item.type">
        <div class="avatar">
          <el-avatar :size="35" :src="item.type === 'ai' ? aiAvatar : userStore.avatar" />
        </div>
        <p
          :class="
            item.type === 'ai'
              ? item.hasWait
                ? 'msg ai-content wait'
                : 'msg ai-content'
              : 'msg user-content'
          "
        >
          <span v-text="item.content"></span>
        </p>
      </div>

      <!-- 提示区域 -->
      <div class="tip-words" v-if="item.type === 'ai' && item.tipWords.length">
        <p class="tips-title">猜你想问：</p>
        <p
          class="word"
          v-for="word of item.tipWords"
          @click="() => emits('answerIt', word)"
        >
          {{ word }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick, watch, defineEmits } from "vue";
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

const emits = defineEmits(["answerIt"]);

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
  &::-webkit-scrollbar {
    width: 0.5625rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #77777739;
    border-radius: 0.625rem;
    cursor: pointer;
    &:hover {
      background: #777777aa;
    }
  }
  .tip-words {
    margin-left: 4.375rem;
    .tips-title {
      margin-bottom: 0.625rem;
      font-size: 1rem;
      font-weight: bold;
      color: #666666e1;
    }
    .word {
      margin-bottom: 0.625rem;
      font-size: 1rem;
      color: #666666c2;
      &:hover {
        color: #79bbff;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

.talk-content-item {
  display: flex;

  .msg {
    background: #79bbff;
    box-shadow: 0.0625rem 0.0625rem 0.5rem 0.0625rem #66666645;
    border-radius: 0.625rem;
    font-size: 1rem;
    padding: 0.5rem;
    max-width: 25rem;
    height: fit-content;
    margin-top: 1.25rem;
    word-wrap: break-word;
    margin-bottom: 1.25rem;
    color: white;
  }
  .ai {
    display: flex;
  }

  .avatar {
    margin: 0.625rem;
  }
}

.user-content {
  animation: msg-enter 0.2s 0s ease-in forwards;
  opacity: 0;
}

@keyframes msg-enter {
  0% {
    transform: translateY(80%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
.user {
  flex-direction: row-reverse;
}

.wait {
  background: #6666 !important;
  animation: breathAni 1s 0s infinite;
}

@keyframes breathAni {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.v-enter-active {
  transition: all 0.5s linear;
  width: 25rem;
  height: 37.5rem;
}
.v-leave-active {
  transition: all 0.5s linear;
  width: 25rem;
  height: 37.5rem;
}

.v-enter-from {
  width: 0px;
  height: 0px;
}
.v-leave-to {
  height: 0px;
  width: 0px;
}
</style>
