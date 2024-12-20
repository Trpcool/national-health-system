import axios from "axios";
import { getToken } from "@/utils/token";
import errorCode from "@/utils/errorCode";
import { ElLoading } from "element-plus";
import { removeToken } from "@/utils/token";
import feedback from "@/utils/feedback";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });
import router from "@/router";
export default class {
  loading = null;
  constructor(options) {
    this.instance = axios.create({
      ...options,
    });
    // 全局请求拦截器
    this.instance.interceptors.request.use((config) => {
      const token = getToken();
      NProgress.start();
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
    this.instance.interceptors.response.use(
      (res) => {
        NProgress.done();
        if (this.loading) {
          this.loading.close();
        }
        return res.data;
      },
      (errRes) => {
        NProgress.done();
        const { status, code } = errRes;
        if (status >= 500) {
          feedback.alertError("服务器异常，请稍后再试！");
        } else if (status >= 400) {
          feedback.alertError("请求失败，请检查接口配置！");
        } else if (code === "ERR_NETWORK") {
          feedback.alertError("网络异常，请检查网络！");
        }
        return Promise.reject(errRes);
      }
    );
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
                feedback.alertError(errorCode[401]);
                removeToken();
                break;
              case 403:
                router.push("/forbidden");
                break;
            }
            reject(res);
          } else {
            resolve(res.data);
          }
        })
        .catch((err) => {
          if (this.loading) {
            this.loading.close();
          }
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
