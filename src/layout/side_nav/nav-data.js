export default [
  {
    title: "数据统计",
    hasChildren: false,
    path: "/admin",
    children: [],
  },
  {
    title: "药品管理",
    hasChildren: true,
    path: "",
    children: [
      {
        title: "药品",
        hasChildren: false,
        path: "/admin/medicine",
        children: [],
      },
      {
        title: "药房管理",
        hasChildren: false,
        path: "/admin/medicine_room",
        children: [],
      },
    ],
  },
  {
    title: "器械管理",
    hasChildren: true,
    path: "",
    children: [
      {
        title: "医疗器械",
        hasChildren: false,
        path: "/admin/instrument",
        children: [],
      },
      {
        title: "器械商管理",
        hasChildren: false,
        path: "/admin/instrument_work",
        children: [],
      },
    ],
  },
];
