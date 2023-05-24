import { defineStore } from "pinia";

import {
  getUserInfoRequest,
  getUserMenuRequest,
  loginPhoneRequest,
  loginUserNameRequest,
} from "@/service/login/login";
import { ElMessage } from "element-plus";
import type { IAccount, IPhone } from "@/types";
import { localCache } from "@/util/cache";
import router from "@/router";
import type { ILoginState } from "./types";
import { mapMenusToRoutes } from "@/util/map-menus";

// 给state指定类型
const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token:
      localCache.getCache("phoneToken") ??
      localCache.getCache("userToken") ??
      "",
    userInfo: localCache.getCache("userInfo") ?? {},
    userMenu: localCache.getCache("userMenu") ?? [],
  }),

  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await loginUserNameRequest(account);
      if (res.code == 200) {
        // 登录
        const id = res.data.user_id;
        this.token = res.data.token;
        localCache.setCache("userToken", res.data.token);

        // 获取用户信息(角色id)
        const userInfoRes = await getUserInfoRequest(id);
        this.userInfo = userInfoRes.data;

        // 根据角色id获取菜单
        const userMenuRes = await getUserMenuRequest(userInfoRes.data.role.id);
        const userMenu = userMenuRes.data;
        this.userMenu = userMenu;

        localCache.setCache("userInfo", userInfoRes.data);
        localCache.setCache("userMenu", userMenu);
        if (userMenu) {
          const routes = mapMenusToRoutes(userMenu);
          routes.forEach((item) => {
            router.addRoute("main", item);
          });
        } else {
          ElMessage({
            type: "warning",
            message: userMenuRes.msg,
          });
        }

        router.push("/main");
      }
      ElMessage({
        type: `${res.code == 200 ? "success" : "error"}`,
        message: res.msg,
      });
    },

    async loginPhoneAction(phone: IPhone) {
      const res = await loginPhoneRequest(phone);
      if (res.code == 200) {
        this.token = res.data.token;
        localCache.setCache("phoneToken", res.data.token);
        router.push("/main");
      }
      ElMessage({
        type: `${res.code == 200 ? "success" : "error"}`,
        message: res.msg,
      });
    },

    async loadLocalCacheAction() {
      const token =
        localCache.getCache("phonToken") || localCache.getCache("userToken");
      const userInfo = localCache.getCache("userInfo");
      const userMenu = localCache.getCache("userMenu");
      if (token && userInfo && userMenu) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenu = userMenu;
        const routes = mapMenusToRoutes(userMenu);
        routes.forEach((item) => {
          router.addRoute("main", item);
        });
      }
    },
  },
});

export default useLoginStore;
