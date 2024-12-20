import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import "@/assets/styles/reset.less";
import router from "./router";
import store from "./store";
import "./permission";
import "nprogress/nprogress.css";
import "vue-cropper/dist/index.css";
import "@/utils/rem.js";
import "./network/ws/index";

import pagination from "./components/pagination.vue";
import upload from "./components/upload/index.vue";
import image from "./components/image.vue";
import popup from "./components/popup.vue";
import icon from "./components/icon.vue";
import  multiplyUpload  from "./components/multiplyUpload/index.vue";
import sideNavItem from "./components/sideNavItem.vue";
// 列表展示页面统计布局
import viewLayout from "./components/viewLayout.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, {
  locale: zhCn,
});

app.component("pagination", pagination);
app.component("upload", upload);
app.component("preImage", image);
app.component("popup", popup);
app.component("viewLayout", viewLayout);
app.component("multiplyUpload",multiplyUpload);
app.component("Icon",icon);
app.component("sideNavItem",sideNavItem);

app.mount("#app");