export default [
  {
    path: "",
    name: "statics",
    component: () => import("@/views/index/index.vue"),
    meta: {
      title: "数据统计",
    },
  },
  {
    path: "/admin/medicine",
    name: "medicine",
    component: () => import("@/views/medicine/index.vue"),
    meta: {
      title: "药品",
    },
  },
  {
    path: "/admin/medicine_room",
    name: "medicine_room",
    component: () => import("@/views/medicine_room/index.vue"),
    meta: {
      title: "药房管理",
    },
  },
  {
    path: "/admin/instrument",
    name: "instrument",
    component: () => import("@/views/instrument/index.vue"),
    meta: {
      title: "医疗器械",
    },
  },
  {
    path: "/admin/instrument_work",
    name: "instrument_work",
    component: () => import("@/views/instrument_work/index.vue"),
    meta: {
      title: "器械商管理",
    },
  },
  {
    path: "/admin/profile",
    name: "profile",
    component: () => import("@/views/profile/index.vue"),
    meta: {
      title: "个人资料",
    },
  },
];
