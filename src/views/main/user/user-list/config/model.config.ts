const modelConfig = {
  pageName: "user/general",
  newTitle: "新建用户",
  editTitle: "编辑用户",
  formItems: [
    { type: "input", prop: "user_name", label: "用户名" },
    { type: "input", prop: "phone", label: "手机号" },
    { type: "input", prop: "password", label: "密码" },
  ],
  fieldName: "user",
};
export default modelConfig;
