import request from "./request";

// 登录
export const loginAPI = (data) => {
  return request.post({ url: "/pro/login", data });
};

// 获取验证码
export const getCodeAPI = () => {
  return request.get({ url: "/captcha" });
};

// 获取用户信息
export const getUserInfoAPI = () => {
  return request.get({ url: "/pro/info" });
};
