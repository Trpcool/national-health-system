import {
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElLoading,
} from "element-plus";
class Feedback {
  loadingInstance = null;
  // 普通消息提示
  msg(msg) {
    ElMessage.info(msg);
  }
  msgError(msg) {
    ElMessage.error(msg);
  }
  msgSuccess(msg) {
    ElMessage.success(msg);
  }
  msgWarning(msg) {
    ElMessage.warning(msg);
  }
  // 系统提示
  alert(msg) {
    ElMessageBox.alert(msg, "系统提示");
  }
  alertError(msg) {
    ElMessageBox.alert(msg, "系统提示", { type: "error" });
  }
  alertWarning(msg) {
    ElMessageBox.alert(msg, "系统提示", { type: "warning" });
  }
  alertSuccess(msg) {
    ElMessageBox.alert(msg, "系统提示", { type: "success" });
  }
  //  通知
  notify(msg) {
    ElNotification.info(msg);
  }
  notifyError(msg) {
    ElNotification.error(msg);
  }
  notifyWarning(msg) {
    ElNotification.warning(msg);
  }
  notifySuccess(msg) {
    ElNotification.success(msg);
  }
  //  确认
  confirm(msg) {
    return ElMessageBox.confirm(msg, "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    });
  }
  /**
   * 确认提交并携带内容
   */
  prompt(content, title, options = {}) {
    return ElMessageBox.prompt(content, title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      ...options,
    });
  }
  loading(msg) {
    this.loadingInstance = ElLoading.service({
      lock: true,
      text: msg
    });
  }
  closeLoading() {
    this.loadingInstance?.close();
  }
}
const feedback = new Feedback();
export default feedback || new Feedback();