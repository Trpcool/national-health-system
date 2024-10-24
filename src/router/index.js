import { createWebHistory, createRouter } from "vue-router";
import homeRoutes from "./home_routes";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/loginPage.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: () => import("@/views/error/forbiddenPage.vue"),
    meta: {
      title: "无权访问",
    },
  },
  {
    path: "/admin",
    name: "首页",
    component: () => import("@/layout/indexPage.vue"),
    meta: {
      title: "首页",
    },
    children: [
      ...homeRoutes
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/error/notFound.vue"),
    meta: {
      title: "页面未找到",
    },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
