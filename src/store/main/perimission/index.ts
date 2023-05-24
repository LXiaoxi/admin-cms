import { getMenuListRequest } from "@/service/main/permission/menu";
import { defineStore } from "pinia";
import type { IMainState } from "./type";

function recursion(mid: number, menu: any[]) {
  const newData: any[] = [];
  for (let item of menu) {
    if (item.parent_id == mid) {
      let obj = item;
      obj.subMenu = recursion(item.menu_id, menu);
      newData.push(item);
    }
  }
  return newData;
}
const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireMenu: [],
  }),
  actions: {
    async getMenuListAction() {
      const menuResult = await getMenuListRequest();
      const newData = menuResult.data.filter((item: any) => {
        if (item.parent_id == null) {
          const obj = item;
          obj.subMenu = recursion(obj.menu_id, menuResult.data);
          return obj;
        }
      });
      this.entireMenu = newData[0].subMenu;
    },
  },
});

export default useMainStore;
