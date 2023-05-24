const contentConfig = {
  title: "",
  tableItems: [
    { type: "normal", prop: "film_id", label: "影片id" },
    { type: "image", prop: "film_image", label: "图片" },
    { type: "normal", prop: "film_url", label: "影片路径" },
    { type: "normal", prop: "film_title", label: "影片标题" },
    { type: "normal", prop: "film_actor", label: "影片作者" },
    { type: "normal", prop: "abc", label: "详情", slotName: "info" },
    { type: "operation", prop: "operation", label: "操作" },
  ],
  isNewShow: false,
  pageName: "video/film",
  isId: true,
};
export default contentConfig;
