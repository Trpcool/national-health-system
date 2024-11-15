import request from "./request";
// 获取信息列表
export const getFriendListAPI = (userId) => {
  return request.get({ url: `/pro/message/${userId}` });
};

// 获取指定好友消息记录
export const getMessageHistoryListAPI = (data) => {
  return request.get({ url: "/message", params: data });
};
