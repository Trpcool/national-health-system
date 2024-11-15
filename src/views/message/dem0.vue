<template>
  <div class="chat-container">
    <!-- 左侧好友列表 -->
    <div class="friend-list">
      <div class="friend-header">
        <span>咨询列表</span>
        <el-button
            type="primary"
            circle
            size="mini"
            icon="el-icon-plus"
            @click="showAddFriendDialog">
        </el-button>
      </div>
      <div class="friend-items">

        <div
            v-for="friend in friendList"
            :key="friend.id"
            class="friend-item"
            :class="{ active: currentFriend.id === friend.id }"
            @click="selectFriend(friend)"
        >
          <el-badge is-dot v-if="friend.isRead === false">
            <!-- 头像 ，有则替换，无则显示名字的第一个字母 -->
            <el-avatar :size="40" :src="friend.avatar">{{ friend.name.charAt(0) }}</el-avatar>
          </el-badge>
          <el-avatar v-else :size="40" :src="friend.avatar">{{ friend.name.charAt(0) }}</el-avatar>
          <div class="friend-info">
            <div class="friend-name">{{ friend.name }}</div>
            <div class="last-message">{{ friend.lastMessage }}</div>
          </div>
        </div>


      </div>
    </div>

    <!-- 右侧聊天区域 -->
    <div class="chat-main">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <span>{{ currentFriend.name }}</span>
      </div>

      <!-- 消息展示区域 -->
      <div class="message-container" ref="messageContainer">
        <div v-for="(msg, index) in messageList" :key="index" class="message-item"
             :class="{ 'message-mine': msg.isMine }">
          <el-avatar :size="30" :src="msg.isMine ? userAvatar : currentFriend.avatar">
            {{ msg.isMine ? 'Me' : currentFriend.name.charAt(0) }}
          </el-avatar>
          <div class="message-content">{{ msg.content }}</div>
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

    <!-- 添加好友对话框 -->
    <el-dialog title="添加好友" :visible.sync="dialogVisible" width="30%">
      <div class="search-container">
        <el-input v-model="searchKeyword" placeholder="请输入用户名搜索" class="search-input">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </div>

      <div class="search-results" v-if="searchResults.length">
        <div v-for="user in searchResults" :key="user.id" class="search-result-item">
          <div style="height: 30px;">
            <el-avatar :size="30" :src="user.avatar">{{ user.name.charAt(0) }}</el-avatar>
          </div>
          <div class="username">{{ user.name }}</div>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="addFriend(user)">
            添加
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script > 
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore()
let socket;
export default {
  name: 'Chat',
  data() {
    return {
      userId: 1, // 当前用户ID
      userAvatar: '', // 当前用户头像
      dialogVisible: false,
      pingInterval: null, // 定时器ID，用于定期发送ping消息
      retryInterval: null, // 重试连接的定时器ID
      reconnecting: false, // 标记是否正在重连
      searchKeyword: '',
      messageInput: '',
      currentFriend: {},
      friendList: [],
      messageList: [],
      searchResults: []
    }
  },
  created() {
    this.init()
    this.getFriendList()
    console.log("====>",userStore.userInfo)
  },
  methods: {
    /**
     * 查询好友列表以及最后一条消息,以及最后一条信息的状态
     */
    getFriendList() {
      // 获取好友列表
      this.friendList = [
        {id: 1, name: '张三', username: 'abczhangsan', avatar: '', lastMessage: '你好啊！', isRead: true},
        {id: 2, name: '李四', username: 'abclisi', avatar: '', lastMessage: '一会你要去干吗！', isRead: false},
      ]
      // 打开默认跟第一个好友聊天
      if (this.friendList.length) {
        this.currentFriend = this.friendList[0] || undefined
      }
    },
    showAddFriendDialog() {
      this.dialogVisible = true
      this.searchKeyword = ''
      this.searchResults = []
    },
    searchUser() {
      // 模拟搜索结果,实际应该请求接口查询
      this.searchResults = [
        {id: 3, name: '王五', avatar: ''},
        {id: 4, name: '赵六', avatar: ''}
      ]
    },
    addFriend(user) {
      // 添加好友逻辑
      this.$message.success(`已发送好友请求给 ${user.name}`)
    },
    selectFriend(friend) {
      this.currentFriend = friend
      this.currentFriend.isRead = true
    },
    sendMessage() {
      // 发送消息
      if (!this.messageInput.trim()) return


      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        // 组装待发送的消息 json
        let message = {
          id: Date.now(),
          fromUserId: 1,
          toUserId: 2,
          content: this.messageInput,
          isMine: true
        }

        socket.send(JSON.stringify(message));  // 将组装好的json发送给服务端，由服务端进行转发
        // 聊天框增加自己的消息
        // 添加新消息  是自己发送的信息
        this.messageList.push(message)
        this.messageInput = ''
        this.scrollToBottom()

      }


    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        container.scrollTop = container.scrollHeight
      })
    },
    getHistoryMessage() {
      // 获取当前聊天用户的历史消息
      this.messageList.push({id: 1, content: `来自${this.currentFriend.name}:你好！`, isMine: false})
      this.messageList.push({id: 2, content: '我的消息，你好啊！', isMine: true})
      this.scrollToBottom()
    },
    init() {
      // 第一步先获取当前用户的基本信息，以用户ID为例,以当前的时间戳作为ID
    //   this.userId = this.$route.query.userId || Date.now()
      // 第二步开始加载socket
      let _this = this;
      if (typeof (WebSocket) == "undefined") {
        this.$message.error("您的浏览器不支持WebSocket");
      } else {
        // 第三步浏览器端连接websocket服务端
        let socketUrl = "ws://118.24.185.235:8080/imserver/" + this.userId;
        if (socket != null) {
          socket.close();
          socket = null;
        }
        // 开启一个websocket服务
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
          console.log("WebSocket连接已打开");

          // 启动心跳定时器，每30秒发送一次ping
          _this.startPing();

          // 停止重连
          _this.reconnecting = false;
          if (_this.retryInterval) {
            clearInterval(_this.retryInterval);
            _this.retryInterval = null;
          }
        };
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        socket.onmessage = function (msg) {
          console.log("收到数据====" + msg.data)
          if (msg.data === 'pong') {
            // 收到pong表示连接正常
            console.log("心跳正常，连接保持");
            return;
          }
          let data = JSON.parse(msg.data)  // 对收到的json数据进行解析
          if (data.fromUserId == _this.currentFriend.id) {
            data.isMine = false
            // 是当前聊天用户发的消息，添加到消息列表
            _this.messageList.push(data)
            _this.scrollToBottom()
          } else {
            // 更新还有列表中的lastMessage  且将状态置为未读
            let friend = _this.friendList.find(item => item.id == data.fromUserId)
            if (friend) {
              friend.lastMessage = data.content
              friend.isRead = false
            }
          }
          // 构建消息内容
        };
        //关闭事件
        socket.onclose = function () {
          console.log("websocket已关闭");
          _this.reconnect();
        };
        //发生了错误事件
        socket.onerror = function () {
          console.log("websocket发生了错误");
          _this.reconnect();
        }
      }


    },
    // 启动心跳定时器，定期发送ping
    startPing() {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }

      this.pingInterval = setInterval(function () {
        console.log("发送ping消息...");
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send('ping');
        }
      }, 30000); // 每30秒发送一次ping
    },

    // 重连机制，自动重新连接
    reconnect() {
      if (this.reconnecting) return;  // 防止多次重连
      this.reconnecting = true;
      console.log("尝试重新连接...");

      this.retryInterval = setInterval(() => {
        this.init();  // 尝试重新初始化WebSocket连接
      }, 5000);  // 每5秒尝试一次重连
    },

    // 关闭WebSocket连接
    closeSocket() {
      if (socket) {
        socket.close();
        clearInterval(this.pingInterval);
        clearInterval(this.retryInterval);
      }
    }
  },
  beforeDestroy() {
    // 组件销毁时关闭WebSocket连接
    this.closeSocket();
  },
  watch: {
    // 监视currentFriend变化，更新消息列表
    currentFriend(newVal) {
      this.messageList = []
      this.getHistoryMessage()
    }
  },
}
</script>

<style scoped>
.chat-container {
  display: flex;
  height: calc(100vh - 20px);
  background-color: #f8f9fa;
  margin: 10px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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

.friend-header span {
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
