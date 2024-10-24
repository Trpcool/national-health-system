import request from "../request";
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
