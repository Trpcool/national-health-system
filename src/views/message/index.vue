<template>
  <div class="chat-container">
    <!-- 左侧好友列表 -->
    <div class="friend-list">
      <div class="friend-header">
        <span>消息中心</span>
        <el-button
          type="primary"
          circle
          size="mini"
          icon="el-icon-plus"
          @click="showAddFriendDialog"
        >
        </el-button>
      </div>
      <div class="friend-items">
        <div
          v-for="friend in friendList"
          :key="friend.proId"
          class="friend-item"
          :class="{ active: currentFriend.proId === friend.proId }"
          @click="selectFriend(friend)"
        >
          <el-badge is-dot v-if="false">
            <!-- 头像 ，有则替换，无则显示名字的第一个字母 -->
            <el-avatar :size="40" :src="friend?.avatar">{{
              friend?.name.charAt(0)
            }}</el-avatar>
          </el-badge>
          <el-avatar v-else :size="40" :src="friend.avatar">{{
            friend.name.charAt(0)
          }}</el-avatar>
          <div class="friend-info">
            <div class="friend-name">{{ friend?.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧聊天区域 -->
    <div class="chat-main">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <span v-if="currentFriend?.name">{{ currentFriend.name }}</span>
      </div>

      <!-- 消息展示区域 -->
      <div class="message-container" v-loading="loading" ref="msgListRef">
        <div
          v-for="(msg, index) in messageList"
          :key="index"
          class="message-item"
          :class="{ 'message-mine': msg.isMine }"
        >
          <el-avatar
            :size="30"
            :src="msg.isMine ? userStore.avatar : currentFriend.avatar"
          >
            {{ msg.isMine ? "Me" : currentFriend.name.charAt(0) }}
          </el-avatar>
          <div class="message-content">{{ msg.content }}</div>
        </div>
        <div class="null-msg" v-if="!messageList.length">
          <el-divider content-position="center">暂无消息</el-divider>
        </div>
      </div>

      <!-- 消息输入区域 -->
      <div class="message-input">
        <el-input
          type="textarea"
          v-model="messageInput"
          :rows="3"
          placeholder="请输入消息..."
          @keyup.enter.native="sendMessage"
        ></el-input>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import WsClient from "@/network/ws";
import { useUserStore } from "@/store/modules/user.js";
import { getFriendListAPI, getMessageHistoryListAPI } from "@/network/message";

const userStore = useUserStore();
const msgListRef = ref(null);

let client = null;
const loading = ref(false);
const friendList = ref([]);
const currentFriend = ref({});
const messageList = ref([]);
const messageInput = ref("");

// 切换对话对象
const selectFriend = async (friend) => {
  messageList.value = [];
  loading.value = true;
  currentFriend.value = friend;
  try {
    const res = await getMessageHistoryListAPI({
      fromUserId: userStore.proId,
      toUserId: friend.proId,
    });
    messageList.value = res.map((item) => ({
      ...item,
      isMine: item.fromUserId === userStore.proId,
    }));
    await nextTick();
    msgListRef.value.scrollTop = msgListRef.value.scrollHeight;
  } catch {
  } finally {
    loading.value = false;
  }
};
// 发送消息
const sendMessage = async () => {
  if (!messageInput.value.trim()) return;
  messageList.value.push({
    id: userStore.proId,
    content: messageInput.value,
    isMine: true,
  });
  client.send({
    fromUserId: userStore.proId,
    content: messageInput.value,
    toUserId: currentFriend.value.proId,
    status: 1,
  });
  messageInput.value = "";
  refreshScroll();
};

// 接收到消息
const onReceive = (msg) => {
  if (msg.fromUserId != currentFriend.value.proId) return;
  messageList.value.push(msg);
  refreshScroll();
};

// 刷新消息位置
const refreshScroll = async () => {
  await nextTick();
  msgListRef.value.scrollTop = msgListRef.value.scrollHeight;
};
const init = async () => {
  client = new WsClient(userStore.proId);
  const res = await getFriendListAPI(userStore.proId);
  friendList.value = res || [];
  selectFriend(friendList.value.length ? friendList.value[0] : {});
  client.receive(onReceive);
};
onMounted(init);
onBeforeUnmount(() => client.destroy());
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100%;
  background-color: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
  border:0.0625rem solid #e4e7ed;
}
::v-deep .el-divider__text{
  background: #f8f9fa !important;
}
.friend-list {
  width: 280px;
  background-color: #fff;
  border-right: 1px solid #ebeef5;
  display: flex;
  flex-direction: column;
}

.friend-header {
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.friend-header span,
.null-msg {
  margin: 0;
  color: #303133;
  font-size: 16px;
  font-weight: 700;
}

.friend-items {
  flex: 1;
  overflow-y: auto;
}

.friend-item {
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f4f4f5;
}

.friend-item:hover {
  background-color: #f5f7fa;
}

.friend-item.active {
  background-color: #ecf5ff;
}

.friend-info {
  margin-left: 10px;
  flex: 1;
}

.friend-name {
  font-weight: 500;
}

.last-message {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  font-weight: 500;
  color: #303133;
}

.message-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: #f8f9fa;
}

.message-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  animation: slideIn 0.3s ease;
}

.message-mine {
  flex-direction: row-reverse;
}

.message-content {
  margin: 0 12px;
  padding: 10px 16px;
  background-color: #fff;
  border-radius: 12px;
  max-width: 60%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.message-mine .message-content {
  background-color: #409eff;
  color: #fff;
}

.message-input {
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #ebeef5;
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.message-input .el-textarea >>> .el-textarea__inner {
  border-radius: 8px;
  resize: none;
  transition: all 0.3s ease;
}

.message-input .el-textarea >>> .el-textarea__inner:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.message-input .el-button {
  border-radius: 8px;
  padding: 12px 24px;
}

.search-container {
  margin: 20px;
}

.search-container .el-input >>> .el-input__inner {
  border-radius: 8px;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
}

.search-result-item {
  padding: 15px 20px;
  transition: all 0.3s ease;
  display: flex;
}

.search-result-item:hover {
  background-color: #f5f7fa;
}

.search-result-item .username {
  line-height: 30px;
  margin-left: 10px;
  flex: 1;
}

.search-result-item .el-button {
  margin-left: 10px;
}

/* 自定义滚动条样式 */
.message-container::-webkit-scrollbar,
.friend-items::-webkit-scrollbar {
  width: 6px;
}

.message-container::-webkit-scrollbar-thumb,
.friend-items::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.message-container::-webkit-scrollbar-track,
.friend-items::-webkit-scrollbar-track {
  background-color: transparent;
}

/* 添加过渡动画 */
.message-item {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
