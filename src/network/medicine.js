import request from "./request";

// 药品
export const getMedicineList = (data) => {
  return request.post({ url: "/medicines/condition", data });
};

// 获取药品分类
export const getMedicineCategoryList = () => {
  return request.get({ url: "/category" });
};

// 增加药品信息
export const addMedicineAPI = (data) => {
  return request.post({ url: "/medicines", data });
};
// 修改药品信息
export const updateMedicineAPI = (data) => {
  return request.put({ url: "/medicines", data });
};

// 删除药品
export const deleteMedicineAPI = (data) => {
  return request.delete({ url: "/medicines", data });
};

// 查询药品详情
export const getMedicineDetailAPI = (id) => {
  return request.get({ url: `/medicines/${id}` });
};

// 设置药品分类
export const setMedicineCategoryAPI = (data) => {
  return request.post({ url: "/medicines/category", data });
};