const modelConfig = {
  newTitle: "新建菜单",
  editTitle: "编辑菜单",
  formItems: [
    { type: "input", prop: "name", label: "菜单名" },
    { type: "input", prop: "path", label: "菜单路径" },
    { type: "input", prop: "icon", label: "图标" },
    { type: "input", prop: "menu_id", label: "菜单id" },
    { type: "input", prop: "parent_id", label: "父级菜单" },
    { type: "input", prop: "remark", label: "菜单备注" },
  ],
  pageName: "menu",
};
export default modelConfig;
