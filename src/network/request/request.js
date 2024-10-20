import axios from "axios";
export default  class{
  constructor(options) {
    this.instance = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
    });
    // 全局请求拦截器
    this.instance.interceptors.request.use((config) => {
      // loading token resolve
      return config;
    });
    // 全局响应拦截器
    this.instance.interceptors.response.use((res) => {
      // close loding
      return res.data;
    });
  }

  // 发送请求
  request(options) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(options)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
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
