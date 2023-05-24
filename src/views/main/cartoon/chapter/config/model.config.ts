const modelConfig = {
  newTitle: "",
  editTitle: "编辑",
  pageName: "cartoon/chapter",
  isId: true,
  formItems: [
    { type: "input", prop: "chapter_id", label: "章节id" },
    { type: "input", prop: "chapter_name", label: "章节名" },
    { type: "image", prop: "image", label: "内容" },
    { type: "input", prop: "page_id", label: "pageID" },
  ],
};

export default modelConfig;
