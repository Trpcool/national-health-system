export default [
  {
    title: "数据统计",
    hasChildren: false,
    path: "/admin",
    icon: "statics",
    children: [],
  },
  {
    title: "药品管理",
    hasChildren: true,
    path: "",
    icon: "medicine-manage",
    children: [
      {
        title: "药品",
        hasChildren: false,
        path: "/admin/medicine",
        icon: "medicine",
        children: [],
      },
      {
        title: "药房管理",
        hasChildren: false,
        path: "/admin/medicine_room",
        icon: "medicine-room",
        children: [],
      },
    ],
  },
  {
    title: "器械管理",
    hasChildren: true,
    path: "",
    icon: "instrument-manage",
    children: [
      {
        title: "医疗器械",
        hasChildren: false,
        path: "/admin/instrument",
        icon: "instruments",
        children: [],
      },
      {
        title: "器械商管理",
        hasChildren: false,
        path: "/admin/instrument_work",
        icon: "instrument-prod",
        children: [],
      },
    ],
  },
  {
    title: "消息中心",
    hasChildren: false,
    path: "/admin/message",
    icon: "messages",
    children: [],
  },
];
