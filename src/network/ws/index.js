const BASE_URL = import.meta.env.VITE_APP_WS_URL;
import feedback from "@/utils/feedback";

export default class WebSocketClient {
  wsClient = null;
  reconnectFlag = null;
  userId = null;
  // 构造函数
  constructor(userId, callback = () => {}) {
    if (typeof WebSocket === "undefined") {
      feedback.alert("当前浏览器不支持WebSocket");
      return;
    }
    this.userId = userId;
    this.wsClient = new WebSocket(BASE_URL + userId);
    this.wsClient.onopen = () => {
      this.stopReconnect();
      callback();
      this.startPing();
    };
    this.wsClient.onerror = () => {
      feedback.msgError("连接失败，尝试重连中...");
      if (!this.reconnectFlag) {
        this.reconnect();
      }
    };
    this.wsClient.onclose = () => {

    };
  }
  // 收到
  receive(callback = (val) => {}) {
    this.wsClient.onmessage = (msg) => {
      if (msg.data === "pong") {
        console.log("pong");
        this.stopReconnect();
      } else {
        callback(JSON.parse(msg.data));
      }
    };
  }
  // 发送
  send(data) {
    if (!this.wsClient) return feedback.msgError("连接失败，刷新试试");
    this.wsClient.send(JSON.stringify(data));
  }

  //   开启心跳包30s一次，维持稳定的长连接
  startPing() {
    console.log("开始监听心跳");
    this.pingTimer = setInterval(() => {
      if (this.wsClient && this.wsClient.readyState === WebSocket.OPEN)
        this.wsClient.send("ping");
      console.log("ping");
    }, 30000);
  }
  //  销毁client
  destroy() {
    if (this.wsClient) {
      this.wsClient.close();
      clearInterval(this.pingTimer);
      clearTimeout(this.reconnectFlag);
      this.reconnectFlag = null;
    }
  }

  //  重连
  reconnect() {
    this.wsClient = new WebSocket(BASE_URL + this.userId);
    this.reconnectFlag = setTimeout(() => {
      feedback.msgError("连接断开，正在尝试重连...");
      this.reconnect();
    }, 5000);
  }
  //停止重传
  stopReconnect() {
    if (this.reconnectFlag) {
      clearTimeout(this.reconnectFlag);
      this.reconnectFlag = null;
    }
  }
}
