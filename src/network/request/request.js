import axios from "axios";
import { getToken } from "@/utils/token";
import errorCode from "@/utils/errorCode";
import { ElLoading, ElMessage } from "element-plus";
import { removeToken } from "../../utils/token";
import feedback from "@/utils/feedback";

export default class {
  loading = null;
  constructor(options) {
    this.instance = axios.create({
      ...options,
    });
    // 全局请求拦截器
    this.instance.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers["token"] = token;
      }
      // 显示loading
      if (config.loading) { 
        this.loading = ElLoading.service({
          lock: true,
          background: "rgba(0, 0, 0, 0.7)",
          text: config.loading,
        });
      }
      return config;
    });
    // 全局响应拦截器
    this.instance.interceptors.response.use((res) => {
      if (this.loading) {
        this.loading.close();
      }
      return res.data;
    });
  }

  // 发送请求
  request(options) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(options)
        .then((res) => {
          if (res.show) {
            switch (res.code) {
              case 0:
                feedback.msgSuccess(res.msg);
                resolve(res.data);
                break;
              case 100:
                feedback.msgError(res.msg);
                break;
              case 401:
                feedback.alertError(errorCode[401])
                removeToken();
                break;
              case 403:
                feedback.msgError(errorCode[403]);
                break;
            }
            reject(res);
          } else {
            resolve(res.data);
          }
        })
        .catch((err) => {
          ElMessage.error("网络异常！请检查网络");
          reject(err);
        });
    });
  }
  get(options) {
    return this.request({
      ...options,
      method: "get",
    });
  }
  post(options) {
    return this.request({
      ...options,
      method: "post",
    });
  }
  put(options) {
    return this.request({
      ...options,
      method: "put",
    });
  }
  delete(options) {
    return this.request({
      ...options,
      method: "delete",
    });
  }
  patch(options) {
    return this.request({
      ...options,
      method: "patch",
    });
  }
}
