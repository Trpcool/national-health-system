import request from "./request";

// 登录
export const loginAPI = (data) => {
  return request.post({ url: "/pro/login", loading:"登录中",data });
};

// 获取验证码
export const getCodeAPI = () => {
  return request.get({ url: "/captcha" });
};

// 获取用户信息
export const getUserInfoAPI = () => {
  return request.get({ url: "/pro/info" });
};


export const adminUpdateUserInfoAPI = (data) => {
  return request.put({ url: "/super", data });
};

//一般管理员用户信息修改
export const updateUserInfoAPI = (data) => {
  return request.put({ url: "/pro", data });
};