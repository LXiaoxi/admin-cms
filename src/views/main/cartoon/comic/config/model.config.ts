const modelConfig = {
  newTitle: "",
  editTitle: "编辑",
  formItems: [
    { type: "input", label: "漫画Id", prop: "comic_id" },
    { type: "input", label: "漫画名", prop: "comic_name" },
    { type: "image", label: "图片", prop: "comic_url" },
    { type: "input", label: "漫画标题", prop: "comic_title" },
    { type: "input", label: "更新进度", prop: "comic_update" },
    { type: "input", label: "人气值", prop: "comic_count" },
  ],
  pageName: "cartoon",
};
export default modelConfig;
