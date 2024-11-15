import request from "./request";
// 医疗器械列表
export const getInstrumentListAPI = (data) => {
  return request.post({ url: "/instrument/page",data });
};

//  医疗添加器械
export const addInstrumentAPI = (data) => {
  return request.post({ url: "/instrument", data });
};

// 删除器械
export const deleteInstrumentAPI = (instrumentIds) => {
  return request.delete({ url: "/instrument", data: { instrumentIds } });
};

// 修改
export const updateInstrumentAPI = (data) => {
  return request.put({ url: "/instrument", data });
};

// 批量设置分类
export const setInstrumentCategoryAPI = (data) => {
  return request.post({ url: "/instrument/category", data });
};

//器械详情
export const getInstrumentDetailAPI = (id) => {
  return request.get({ url: "/instrument/" + id });
};

// 获取器械分类
export const getInstrumentCategoryListAPI = () => {
  return request.get({ url: "/category/instrument" });
};
