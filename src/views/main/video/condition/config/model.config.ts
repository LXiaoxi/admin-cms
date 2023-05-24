const modelConfig = {
  newTitle: "",
  editTitle: "",
  formItems: [
    { type: "input", prop: "condition_id", label: "条件id" },
    { type: "input", prop: "condition_name", label: "条件名" },
    { type: "input", prop: "subcondition_name", label: "类型名" },
    { type: "input", prop: "subcondition_path", label: "类型路径" },
  ],
  pageName: "video/condition",
  isId: true,
};
export default modelConfig;
