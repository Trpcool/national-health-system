import request from "./request";
/**
 * 位置相关信息编辑增删改查
 */

// 获取省列表信息接口
export function getProvinceListAPI() {
  return request.get({
    url: "/review",
  });
}

// 获取市列表信息接口
export function getCityListAPI(provinceId) {
  return request.get({
    url: `/city/${provinceId}`,
  });
}

// 获取县列表信息接口
export function getAreaListAPI(cityId) {
  return request.get({
    url: `/district/${cityId}`,
  });
}
