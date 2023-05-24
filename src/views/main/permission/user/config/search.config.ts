export const searchConfig = {
  title: "管理员搜索",
  formItems: [
    {
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名",
      prop: "name",
      initialValue: "123",
    },
    {
      type: "input",
      label: "手机号",
      placeholder: "请输入手机号",
      prop: "phone",
    },
  ],
};

interface searchFormItem {
  type: string;
  label: string;
  placeholder: string;
  name: string;
}
