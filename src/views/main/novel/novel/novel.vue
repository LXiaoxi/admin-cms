<template>
  <div class="novel">
    <page-search :search-config="searchConfig"></page-search>
    <page-tab
      :category-data="categoryData"
      @handle-change-tab="handleChangeTab"
    ></page-tab>
    <page-content
      :table-data="novelData"
      :total="total"
      :content-config="contenConfig"
      @handle-current-change="getPageData"
      @handle-size-change="getPageData"
      @handle-edit="handleEdit"
      @handle-new="handleNew"
      @handle-delete="getPageData"
    ></page-content>
    <page-model
      ref="modelRef"
      :model-config="modelConfig"
      @get-page-data="getPageData"
    ></page-model>
  </div>
</template>

<script setup lang="ts" name="novel">
import { ref } from "vue";

import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";
import pageTab from "@/components/page-tab/page-tab.vue";

import searchConfig from "./config/search.config";
import contenConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import { getNovelCategoryListRequest } from "@/service/main/novel/category";
import { getNovelListRequest } from "@/service/main/novel/novel";

import usePageModel from "@/hooks/usePageModel";
const { modelRef, handleEdit, handleNew } = usePageModel();
// 获取小说类型
const currentCategoryId = ref<number>(1);
const categoryData = ref<any>();
function getCategoryData() {
  getNovelCategoryListRequest().then((res) => {
    categoryData.value = res.data.map((item: any) => {
      return { id: item.id, name: item.category_name };
    });
    currentCategoryId.value = res.data[0].id;
  });
}
getCategoryData();
// 小说类型切换
function handleChangeTab(id: number) {
  currentCategoryId.value = id;
  getPageData();
}

// 获取小说列表
const novelData = ref<any>();
const total = ref<number>();
function getPageData(page = 0, pageSize = 10, otherInfo?: any) {
  getNovelListRequest({
    table: "left",
    category_id: currentCategoryId.value,
    page,
    pageSize,
  }).then((res) => {
    if (res.code == 200) {
      novelData.value = res.data;
      total.value = res.total;
    }
  });
}
getPageData();
</script>

<style scoped>
.novel {
}
</style>
