const contentConfig = {
  title: "",
  tableItems: [
    { type: "normal", label: "漫画Id", prop: "comic_id" },
    { type: "normal", label: "漫画名", prop: "comic_name" },
    { type: "image", label: "图片", prop: "image" },
    { type: "normal", label: "漫画标题", prop: "comic_title" },
    { type: "normal", label: "更新进度", prop: "comic_update" },
    { type: "normal", label: "人气值", prop: "comic_count" },
    { type: "operation", label: "操作", prop: "operation" },
  ],
  pageName: "cartoon",
  isNewShow: false, // 是否显示新建按钮
};

export default contentConfig;
