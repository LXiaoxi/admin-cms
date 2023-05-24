export const contentConfig = {
  title: "管理员列表",
  tableItems: [
    {
      type: "normal",
      prop: "user_name",
      label: "用户名",
    },
    {
      type: "normal",
      prop: "phone",
      label: "手机号",
    },
    {
      type: "normal",
      prop: "state",
      label: "状态",
      slotName: "status",
    },
    {
      type: "normal",
      prop: "role_name",
      label: "角色名",
    },
    {
      type: "normal",
      prop: "role_id",
      label: "角色ID",
    },
    {
      type: "timer",
      prop: "createTime",
      label: "创建时间",
    },
    {
      type: "timer",
      prop: "updateTime",
      label: "更新时间",
    },
    {
      type: "operation",
      label: "操作",
      prop: "",
    },
  ],
  pageName: "",
};
