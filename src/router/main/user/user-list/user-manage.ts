const userManage = () => import("@/views/main/user/user-list/user-manage.vue");
export default {
  path: "/main/user/list",
  name: "user-manage",
  component: userManage,
  children: [],
};
