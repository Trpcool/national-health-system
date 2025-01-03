// export default [
//   {
//     path: "",
//     name: "statics",
//     component: () => import("@/views/index/index.vue"),
//     meta: {
//       title: "数据统计",
//     },
//   },
//   {
//     path: "/admin/medicineCategory",
//     name: "medicineCategory",
//     component: () => import("@/views/medicine_category/index.vue"),
//     meta: {
//       title: "药品分类",
//     },
//   },
//   {
//     path: "/admin/medicine",
//     name: "medicine",
//     component: () => import("@/views/medicine/index.vue"),
//     meta: {
//       title: "药品",
//     },
//   },
//   {
//     path: "/admin/medicine_room",
//     name: "medicine_room",
//     component: () => import("@/views/medicine_room/index.vue"),
//     meta: {
//       title: "药房管理",
//     },
//   },

//   {
//     path: "/admin/instrument",
//     name: "instrument",
//     component: () => import("@/views/instrument/index.vue"),
//     meta: {
//       title: "医疗器械",
//     },
//   },
//   {
//     path: "/admin/instrument_work",
//     name: "instrument_work",
//     component: () => import("@/views/instrument_work/index.vue"),
//     meta: {
//       title: "器械商管理",
//     },
//   },
//   {
//     path: "/admin/profile",
//     name: "profile",
//     component: () => import("@/views/profile/index.vue"),
//     meta: {
//       title: "个人资料",
//     },
//   },
//   {
//     path: "/admin/message",
//     name: "message",
//     component: () => import("@/views/message/index.vue"),
//     meta: {
//       title: "消息中心",
//     },
//   },
// ];

/**
 * 这里配置数据，同时也动态配置nav菜单栏选项，注意配置规则
 */
const routeConfig = [
  {
    path: "",
    name: "statics",
    // 注意！如果没有component则是二级菜单选项，否则是一个菜单栏选项
    component: () => import("@/views/index/index.vue"),
    // 菜单栏名称
    meta: {
      title: "数据统计",
    },
    // 数组存在数据，则存在二级菜单，当前是一级菜单
    children: [],
    // 必须设置icon,如果没有icon则不显示在该sideNav列表
    navIcon: "statics",
  },
  // 药品管理
  {
    //二级菜单名称
    meta: {
      title: "药品管理",
    },
    navIcon: "medicine-manage",
    children: [
      {
        path: "/admin/medicine_category",
        name: "medicineCategory",
        component: () => import("@/views/medicine_category/index.vue"),
        meta: {
          title: "药品分类",
        },
        navIcon: "medicine-category",
      },
      {
        path: "/admin/medicine",
        name: "medicine",
        component: () => import("@/views/medicine/index.vue"),
        meta: {
          title: "药品",
        },
        navIcon: "medicine",
      },
      {
        path: "/admin/medicine_room",
        name: "medicine_room",
        component: () => import("@/views/medicine_room/index.vue"),
        meta: {
          title: "药房管理",
        },
        navIcon: "medicine-room",
      },
    ],
  },
  // 器械管理一级菜单
  {
    meta: {
      title: "器械管理",
    },
    navIcon: "instrument-manage",
    children: [
      {
        path: "/admin/instrument_category",
        name: "instrument_category",
        component: () => import("@/views/instrument_category/index.vue"),
        meta: {
          title: "器械分类",
        },
        navIcon: "instrument-category",
      },
      {
        path: "/admin/instrument",
        name: "instrument",
        component: () => import("@/views/instrument/index.vue"),
        meta: {
          title: "医疗器械",
        },
        navIcon: "instruments",
      },
      {
        path: "/admin/instrument_work",
        name: "instrument_work",
        component: () => import("@/views/instrument_work/index.vue"),
        meta: {
          title: "器械商管理",
        },
        navIcon: "instrument-prod",
      },
    ],
  },
  // 消息中心
  {
    path: "/admin/message",
    name: "message",
    component: () => import("@/views/message/index.vue"),
    meta: {
      title: "消息中心",
    },
    navIcon: "messages",
  },
  // 个人资料
  {
    path: "/admin/profile",
    name: "profile",
    component: () => import("@/views/profile/index.vue"),
    meta: {
      title: "个人资料",
    },
  },
  // 药房配药
  {
    path:"/admin/medicine_conf/:id",
    name:'medicine_conf',
    component:()=>import("@/views/medicine_config/index.vue"),
    meta:{
      title:'药房配药'
    } 
  }
];

// 生成导航菜单
export function getSideNavMenu() {
  const result = [];
  function createNavItem(routes, target) {
    routes.forEach((item) => {
      if (item?.navIcon) {
        const navItem = {
          name: item.meta.title,
          path: item.name === "statics" ? "/admin" : item.path,
          icon: item.navIcon,
          isMenu: !item?.component ? true : false,
        };
        target.push(navItem);
        if (item?.children && item.children.length) {
          navItem.children = [];
          createNavItem(item.children, navItem.children);
        }
      }
    });
  }
  createNavItem(routeConfig, result);
  return result;
}
// 生成routes
export function getRoutes() {
  const result = [];
  function createRoute(target) {
    target.forEach((item) => {
      if (item?.path || item?.component) {
        const { children, navIcon, ...route } = item;
        result.push(route);
      } else if (item?.children) {
        createRoute(item.children);
      }
    });
  }
  createRoute(routeConfig);
  return result;
}

