const contentConfig = {
  title: "",
  tableItems: [
    { type: "normal", prop: "user_id", label: "用户id" },
    { type: "normal", prop: "user_name", label: "用户名" },
    { type: "normal", prop: "phone", label: "手机号" },
    { type: "state", prop: "state", label: "状态" },
    { type: "normal", prop: "problem", label: "反馈内容" },
    { type: "image", prop: "image_url", label: "反馈图片" },
    { type: "timer", prop: "creatTime", label: "反馈时间" },
    { type: "normal", prop: "operation_state", label: "处理状态", slotName: "handle" },
    { label: "处理状态", slotName: "operation" },
  ],
  pageName: "feedback",
};
export default contentConfig;
