const searchConfig = {
  title: "角色搜索",
  formItems: [
    { type: "input", label: "角色名", prop: "role_name" },
    { type: "input", label: "角色状态", prop: "role_state" },
    { type: "date-picker", label: "创建时间", prop: "createTime" },
    { type: "date-picker", label: "修改时间", prop: "updateTime" },
  ],
};
export default searchConfig;
