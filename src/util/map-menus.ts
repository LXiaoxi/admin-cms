import router from "@/router";
import type { RouteRecordRaw } from "vue-router";

const routers: RouteRecordRaw[] = [];

export let firstMenu: any = null;

function recursionRouter(router: RouteRecordRaw[], menus: any) {
  if (!menus) return;
  for (let menu of menus) {
    const route = router.find((item) => item.path === menu.path);
    if (route) routers.push(route);
    if (!firstMenu && route) {
      firstMenu = menu;
    }
    if (menu.subMenu) {
      recursionRouter(router, menu.subMenu);
    }
  }
  return routers;
}

export function mapMenusToRoutes(userMenu: any[]) {
  const localRoutes: RouteRecordRaw[] = [];
  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true,
    }
  );
  // 添加全部路由对象
  for (let key in files) {
    const module = files[key];
    localRoutes.push(module.default);
  }
  recursionRouter(localRoutes, userMenu[0].subMenu);
  return routers;
}

export function mapPathToMenu(path: string, useMenus: any[]) {
  for (let menu of useMenus[0].subMenu) {
    for (let item of menu.subMenu) {
      if (item.path === path) {
        return item;
      }
    }
  }
}
