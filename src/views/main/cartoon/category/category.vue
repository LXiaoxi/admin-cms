<template>
  <div class="category">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></page-search>
    <page-content
      :table-data="categoryData"
      :total="total"
      :content-config="contentConfig"
      @handle-current-change="getPageData"
      @handle-size-change="getPageData"
      @handle-new="handleNew"
      @handle-edit="handleEdit"
      @handle-delete="getPageData"
    ></page-content>

    <page-model
      ref="modelRef"
      :model-config="modelConfig"
      @get-page-data="getPageData"
    ></page-model>
  </div>
</template>

<script setup lang="ts" name="category">
import { ref } from "vue";

import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import { getCategoryRequest } from "@/service/main/cartoon/category";

import usePageModel from "@/hooks/usePageModel";
import usePageSearch from "@/hooks/usePageSearch";

const categoryData = ref<any>();
const total = ref<number>();
function getPageData(page = 0, pageSize = 10, otherInfo?: any) {
  getCategoryRequest({ page, pageSize, ...otherInfo }).then((res) => {
    if (res.code == 200) {
      categoryData.value = res.data;
      total.value = res.total;
    }
  });
}
getPageData();

// function handleQuery(searchForm: any) {
//   getPageData(0, 10, searchForm);
//   console.log(searchForm);
// }
// function handleReset() {
//   getPageData();
// }
// 查询/重置

const { handleQuery, handleReset } = usePageSearch(getPageData);
// 编辑/新建
const { modelRef, handleEdit, handleNew } = usePageModel();
</script>

<style scoped>
.category {
}
</style>
