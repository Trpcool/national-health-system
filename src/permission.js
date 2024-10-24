import router from "./router";
import NProgress from "nprogress";
import { getToken, removeToken } from "./utils/token";
import { useUserStore } from "@/store/modules/user";
// 顶部加载条
NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    document.title = to.meta.title;
    if (to.path === "/" || to.path === "/login") {
      next({ path: "/admin" });
    } else if (!useUserStore().account) {
      useUserStore()
        .getUserInfo()
        .then(() => {
          next();
        })
        .catch(() => {
          removeToken();
          next({ path: `/login?redirect=${from.path}` });
        });
    } else {
      next();
    }
  } else {
    NProgress.done();
    if (to.path === "/login") {
      next();
    } else {
      next({ path: `/login?redirect=${from.path}` });
    }
  }
});

router.afterEach((to) => {
  NProgress.done();
});
