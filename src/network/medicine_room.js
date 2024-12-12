import request from "./request";

/**
 * 药房增改查相关模块
 */
// 药房分页查询
export const getMedicineRoomListAPI = (data) => {
  return request.post({ url: "/pharmacy/page", data });
};

// 添加药房
export const addMedicineRoomAPI = (data) => {
  return request.post({ url: "/pharmacy", data });
};

// 修改药房基础信息
export const updateMedicineRoomAPI = (data) => {
  return request.put({ url: "/pharmacy", data });
};
