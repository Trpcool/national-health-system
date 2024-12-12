import request from "./request";

/**
 * 对某一药房下的药品操作模块
 */
// 药房下对应药分类下药品查询(药房->分类->药品)
export function getMedicineListAPI(data) {
  return request.get({ url: "/private/med/page", data });
}

// 添加药品
export function addMedicineToRoomAPI(data) {
  return request.post({ url: "/private/med", data });
}

// 修改药品在药房中的分类信息
export function updateMedicineCategoryInfoAPI(data) {
  return request.put({ url: "/private/med", data });
}
// 删除药品
export function deleteMedicineAPI(id) {
  return request.delete({ url: `/private/med/${id}` });
}

// 药品起售
export function startSaleMedicineAPI(id) {
  return request.put({ url: `/private/med/start/${privateId}` });
}
// 药品停售
export function stopSaleMedicineAPI(id) {
  return request.delete({ url: `/private/med/stop/${id}` });
}
