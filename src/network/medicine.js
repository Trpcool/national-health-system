import request from './request';

// 药品
export const getMedicineList = (data) => {
   return request.post({ url: '/medicines/condition', data });
};

// 获取药品分类
export const getMedicineCategoryList = () => {
   return request.get({ url: '/category' });
};