<template>
  <div class="menu">
    <page-content
      :tableData="menuData"
      :total="total"
      :contentConfig="contentConfig"
      @handle-edit="handleEdit"
      @handle-new="handleNew"
      @handle-delete="getPageData"
    ></page-content>
    <page-model
      ref="modelRef"
      :modelConfig="modelConfig"
      @get-page-data="getPageData"
    ></page-model>
  </div>
</template>

<script setup lang="ts" name="menu">
import { ref } from "vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import { getMenuListRequest } from "@/service/main/permission/menu";
import usePageModel from "@/hooks/usePageModel";

const menuData = ref<any>([]);
const total = ref<number>(10);
function getPageData() {
  getMenuListRequest().then((res) => {
    if (res.code == 200) {
      const data = res.data.filter((item: any) => {
        if (item.parent_id == null) {
          const obj = item;
          obj.subMenu = recursion(obj.menu_id, res.data);
          return obj;
        }
      });
      menuData.value = data[0].subMenu;
    }
  });
}
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

getPageData();

const { modelRef, handleEdit, handleNew } = usePageModel();
</script>

<style scoped></style>
