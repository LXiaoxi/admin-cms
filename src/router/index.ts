import { localCache } from "@/util/cache";
import { firstMenu } from "@/util/map-menus";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      redirect: "/main",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/not-found/not-found.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  const token =
    localCache.getCache("phoneToken") || localCache.getCache("userToken");
  if (to.path.startsWith("/main") && !token) {
    return "/login";
  }

  if (to.path === "/main") {
    router.push(firstMenu.path);
  }
});

export default router;
