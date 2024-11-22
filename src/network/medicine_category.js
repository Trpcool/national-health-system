import request from "./request";

// 获取药品分类列表
export const getCategoryListAPI = (data) => {
  return request.get({ url: "/category/page", params: data });
};

// 添加药品分类
export const addCategoryAPI = (data) => {
  return request.post({ url: "/category", data });
};

// 修改分类
export const updateCategoryAPI = (data) => {
  return request.put({ url: "/category", data });
};

// 删除分类
export const deleteCategoryAPI = (id) => {
  return request.delete({ url: `/category/${id}` });
};
