/**
 * 效验上传图片是否合法，不合法并抛出异常
 * @param {Object} file 文件对象
 */
export async function validateImgFile(file) {
  if (!file) throw new Error("请选择文件");
  const strs = file.name.split(".");
  if (!["jpg", "jpeg", "png", "gif"].includes(strs[strs.length - 1].toLowerCase()))
    throw new Error("请选择.jpg,.jpeg,.png,.gif格式的图片");
  if (file.size > 1024 * 1024 * 2) throw new Error("图片大小不能超过2M");
  return true;
}
