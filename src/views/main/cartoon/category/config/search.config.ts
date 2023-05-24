const searchConfig = {
  title: "漫画类型列表",
  formItems: [
    { type: "input", label: "漫画分类", prop: "category_name" },
    { type: "date-picker", label: "创建时间", prop: "createTime" },
    { type: "date-picker", label: "更新时间", prop: "updateTime" },
  ],
};

export default searchConfig;
