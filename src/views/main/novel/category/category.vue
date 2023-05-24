<template>
  <div class="category">
    <page-search :search-config="searchConfig"></page-search>
    <page-content
      :table-data="categoryData"
      :total="total"
      :content-config="contentConfig"
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

<script setup lang="ts" name="category">
import { ref } from "vue";

import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import { getNovelCategoryListRequest } from "@/service/main/novel/category";

import usePageModel from "@/hooks/usePageModel";
const { modelRef, handleEdit, handleNew } = usePageModel();
const categoryData = ref<any>();
const total = ref<number>();
function getPageData() {
  getNovelCategoryListRequest().then((res) => {
    if (res.code == 200) {
      categoryData.value = res.data;
    }
  });
}

getPageData();
</script>

<style scoped>
.category {
}
</style>
