import request from "./request";

//上传照片统一接口
export function uploadImgAPI(file) {
  const formData = new FormData();
  formData.append("file", file);
  return request.post({
    url: "/common/upload",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
}

// 多文件上传组件
export const multipleUpload = (uploadOPtion) => {
  console.log("option",uploadOPtion);
};
// request.post({
//   url: "/common/upload",
//   data,
// });
