export const ROLE = {
  SUPER_ADMIN: 0, // 超级管理员
  ADMIN: 1, // 管理员
};

// 获取管理员名称
export const getRoleName = (roleId = 9999) => {
  if (typeof roleId !== "number") {
    roleId = Number(roleId);
  }
  switch (roleId) {
    case ROLE.SUPER_ADMIN:
      return "超级管理员";
    case ROLE.ADMIN:
      return "管理员";
    default:
      return "未知";
  }
};
