const contentConfig = {
  title: "菜单列表",
  pageName: "menu",
  tableItems: [
    { label: "菜单名", prop: "name" },
    { label: "菜单路径", prop: "path" },
    { label: "菜单图标", prop: "icon" },
    { label: "菜单备注", prop: "remark" },
    { label: "菜单Id", prop: "menu_id" },
    { label: "父级Id", prop: "parent_id" },
    { type: "operation", label: "操作" },
  ],
  childrenTree: {
    rowKey: "menu_id",
    treeProps: {
      children: "subMenu",
    },
  },
};
export default contentConfig;
