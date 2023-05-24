<template>
  <div class="chapter">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></page-search>
    <template v-for="item in categoryData">
      <span class="title" @click="handleChangeTitle(item.id)">
        {{ item.name }}
      </span>
    </template>
    <page-content
      :table-data="chapterData"
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

<script setup lang="ts" name="chapter">
import { ref } from "vue";
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import usePageModel from "@/hooks/usePageModel";
import usePageSearch from "@/hooks/usePageSearch";

import { getCartoonListRequest } from "@/service/main/cartoon/comic";
import { getCategoryRequest } from "@/service/main/cartoon/category";
const chapterData = ref<any>();
const total = ref<number>();
const currenIndex = ref<number>(1);
function getPageData(page = 0, pageSize = 10, otherInfo?: any) {
  const newInfo = { category_id: currenIndex.value, ...otherInfo };
  getCartoonListRequest({ page, pageSize, ...newInfo }).then((res) => {
    if (res.code == 200) {
      chapterData.value = res.data;
      total.value = res.total;
    }
  });
}
getPageData();
const categoryData = ref<any>();
function getCategoryData() {
  getCategoryRequest({}).then((res) => {
    if (res.code == 200) {
      categoryData.value = res.data.map((item: any) => {
        return { id: item.category_id, name: item.category_name };
      });
    }
  });
}
getCategoryData();
function handleChangeTitle(id: any) {
  currenIndex.value = id;
  getPageData(0, 10, id);
}

// 新建/编辑
const { modelRef, handleEdit, handleNew } = usePageModel();
// 查询/重置
const { handleQuery, handleReset } = usePageSearch(getPageData);
</script>

<style scoped lang="less">
.chapter {
  .title {
    padding: 10px;
  }
}
</style>
