const showModelConfig = {
  editTitle: "",
  newTitle: "",
  formItems: [
    { type: "input", prop: "id", label: "影片id" },
    { type: "input", prop: "actor", label: "作者" },
    { type: "input", prop: "type", label: "类型" },
    { type: "input", prop: "area", label: "地区" },
    { type: "input", prop: "year", label: "年份" },
    { type: "input", prop: "related_label", label: "关联标签" },
    { type: "input", prop: "film_url", label: "影片链接" },
    { type: "input", prop: "play_link", label: "播放链接" },
  ],
  pageName: "video/detail",
  isId: true,
};
export default showModelConfig;
