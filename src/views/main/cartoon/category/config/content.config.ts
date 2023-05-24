const contentConfig = {
  title: "分类列表",
  tableItems: [
    { type: "normal", prop: "category_name", label: "分类名" },
    { type: "timer", prop: "createTime", label: "创建时间" },
    { type: "timer", prop: "updateTime", label: "更新时间" },
    { type: "operation", prop: "operation", label: "操作" },
  ],
  pageName: "cartoon",
  fieldName: "category",
  otherInfo: "category",
};

export default contentConfig;
