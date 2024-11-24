import request from "./request";

// 获取所有器械类别(分页)
export const getCategoryListAPI = (params) => {
  return request.get({
    url: "/category/instrument/page",
    params,
  });
};

// 添加分类
export const addCategoryAPI = (data) => {
  return request.post({ url: "/category/instrument", data });
};

// 修改分类
export const updateCategoryAPI = (data) => {
  return request.put({ url: "/category/instrument", data });
};

// 删除
export const deleteCategoryAPI = (id) => {
  return request.delete({ url: `/category/instrument/${id}` });
};
