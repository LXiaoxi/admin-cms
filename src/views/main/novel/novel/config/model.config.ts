const modelConfig = {
  newTitle: "",
  editTitle: "",
  formItems: [
    { type: "input", prop: "category_id", label: "分类id" },
    { type: "input", prop: "novel_name", label: "小说名" },
    { type: "input", prop: "novel_number", label: "小说编号" },
    { type: "input", prop: "novel_progress", label: "小说进度" },
  ],
  pageName: "novel/left",
  isId: true,
};
export default modelConfig;
