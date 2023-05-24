const modelConfig = {
  editTitle: "",
  newTitle: "",
  formItems: [
    // { type: "input", prop: "film_id", label: "影片id" },
    { type: "image", prop: "film_image", label: "图片" },
    { type: "input", prop: "film_url", label: "影片路径" },
    { type: "input", prop: "film_title", label: "影片标题" },
    { type: "input", prop: "film_actor", label: "影片作者" },
  ],
  pageName: "video/film",
  isId: true,
};
export default modelConfig;
