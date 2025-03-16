<template>
  <!-- <transition>
    <AiDialog v-if="showDialog" @close="showDialog = false" />
  </transition> -->
  <div class="ai-assitant">
    <div class="icon-btn">
      <p class="tips">hi~ 我是您的贴心小助理，有什么可以帮助您的吗？</p>
      <img
        width="50"
        src="../../assets/icons/ai-icon(1).svg"
        alt=""
        @click="showDialog = true"
      />
    </div>
  </div>

  <!-- 对话弹窗 -->
  <el-drawer v-model="showDialog" direction="rtl" @keyup.enter="handleSend">
    <template #header>
      <h4 class="dialog-header">国民健康AI专属服务</h4>
    </template>
    <template #default>
      <div class="message-wrapper">
        <talkContent
          ref="talkContentRef"
          :contentList="contentList"
          @answerIt="handleTriggerTipWord"
        />
      </div>
    </template>
    <template #footer>
      <div class="edit-option">
        <el-input
          v-model="questionText"
          placeholder="请输入您想要问的问题~"
          :autosize="{ minRows: 2, maxRows: 6 }"
          type="textarea"
          resize="none"
          style="margin: 0px 0px 0px 10px; width: 78%"
        />

        <el-button
          type="primary"
          @click="handleSend"
          :disabled="isTalk"
          size="large"
          round
        >
          <span style="margin-right: 5px" v-if="isTalk"
            ><el-icon class="talking-loading"><Loading /></el-icon
          ></span>
          {{ isTalk ? "解答中" : "发送" }}</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import { Loading } from "@element-plus/icons-vue";
import talkContent from "./talkContent.vue";
import { sendMessage } from "../../network/aiAssaitant.js";
import { parseAiResponse } from "../../utils/parseAiRes.js";
import { useUserStore } from "@/store/modules/user";

const props = defineProps({
  speed: {
    type: Number,
    default: 30,
  },
});
const userStore = useUserStore();

let msgId = 3;
const showDialog = ref(false);
const isTalk = ref(false);
const talkContentRef = ref();
const questionText = ref("");

//对话渲染数据
const contentList = ref([
  // {
  //   id: 1,
  //   type: "user",
  //   content: "这是用户的问题2",
  // },
  // {
  //   id: 2,
  //   type: "ai",
  //   content: "这是一段回复的答案2",
  // tipWords:[] //提示词
  // },
]);

async function handleSend() {
  if (!questionText.value.trim() || isTalk.value) return;
  isTalk.value = true;

  const userQuestion = {
    id: msgId++,
    type: "user",
    content: questionText.value,
  };
  // 渲染列表
  contentList.value.push(userQuestion);

  let aiResponse = {
    id: msgId++,
    type: "ai",
    content: "",
    hasWait: true,
    tipWords: [],
  };
  // 发送请求
  questionText.value = "";
  contentList.value.push(aiResponse);
  // 发送请求
  const result = await sendMessage("321321", userQuestion.content);

  // 创建解码器
  const decoder = new TextDecoder();
  const reader = result.body.getReader();

  // 内容结束标记
  let isEnd = false;
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      if (!contentList.value[contentList.value.length - 1].content)
        contentList.value[contentList.value.length - 1].content = "数据响应异常！";
      break;
    }
    const text = decoder.decode(value);
    const parseText = parseAiResponse(text);
    // 解答内容结束
    if (parseText === "---tip-words-gap---") {
      isEnd = true;
      continue;
    }

    if (!isEnd)
      parseText && (contentList.value[contentList.value.length - 1].content += parseText);
    if (isEnd)
      parseText &&
        contentList.value[contentList.value.length - 1].tipWords.push(parseText);
    if (aiResponse.hasWait)
      contentList.value[contentList.value.length - 1].hasWait = false;
  }
  console.log(contentList.value[contentList.value.length - 1].tipWords);
  isTalk.value = false;
}

//处理点击提示词问答
function handleTriggerTipWord(tipWord) {
  questionText.value = tipWord;
  handleSend();
}

onMounted(() => {
  contentList.value.push({
    id: 1,
    type: "ai",
    content: "您好！有什么需要想问的吗~",
    tipWords: [],
  });
});
</script>

<style lang="less" scoped>
.ai-dialog {
  position: absolute;
  overflow: hidden;
  bottom: 1.25rem;
  right: 2.5rem;
  z-index: 1000000;
}
.ai-assitant {
  position: absolute;
  bottom: 0px;
  right: 1.875rem;

  .icon-btn {
    animation: ani 2s 2s infinite;
    transition: all 0.5s ease-in-out;
    position: relative;
    top: 2.5rem;
    cursor: pointer;
    .tips {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      position: absolute;
      color: white;
      font: 0.625rem;
      font-weight: bold;
      width: 12.5rem;
      left: -12.5rem;
      top: -5rem;
      background: #79bbff;
      border-radius: 0.625rem;
      padding: 0.4375rem;
      opacity: 0;
      &::after {
        content: "";
        display: block;
        position: absolute;
        background: #79bbff;
        left: 10rem;
        height: 0.9375rem;
        width: 4.375rem;
        clip-path: polygon(0% 0, 40% 0, 60% 100%);
      }
    }

    &:hover {
      animation: none;
      top: 0.625rem;
    }

    &:hover .tips {
      opacity: 1;
    }
  }
}
@keyframes ani {
  0% {
    top: 2.5rem;
  }
  50% {
    top: 1.875rem;
  }
  70% {
    top: 0.625rem;
  }
  100% {
    top: 2.5rem;
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

.dialog-header {
  color: #79bbff;
  text-align: center;
  font-size: 1.25rem;
}

.edit-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.talking-loading {
  animation: an 1s 0s infinite linear;
}

@keyframes an {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.message-wrapper {
  width: 100%;
  height: 100%;
}

::v-deep {
  .el-textarea__inner {
    border: none;
    border-radius: 0.9375rem;
    box-shadow: 0.125rem 0.125rem 0.375rem 0.0625rem #66666644;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background: #77777766;
      border-radius: 0.625rem;
      cursor: pointer;
      position: relative;
      &:hover {
        background: #777777aa;
      }
    }

    &:focus {
      border: rgba(94, 94, 94, 0.236) solid 0.0625rem;
    }
  }
}
</style>
