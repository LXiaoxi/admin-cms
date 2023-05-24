const contentConfig = {
  pageName: "role",
  title: "角色列表",
  tableItems: [
    { type: "normal", prop: "role_name", label: "角色名" },
    { type: "state", prop: "role_state", label: "角色状态" },
    { type: "normal", prop: "role_remark", label: "角色备注" },
    { type: "timer", prop: "createTime", label: "创建时间" },
    { type: "timer", prop: "updateTime", label: "修改时间" },
    { type: "operation", prop: "operation", label: "操作" },
  ],
};
export default contentConfig;
