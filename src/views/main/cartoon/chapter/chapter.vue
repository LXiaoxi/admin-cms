<template>
  <div class="chapter">
    <page-search
      ref="searchRef"
      :search-config="searchConfigRef"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
      @handle-select-change="handleSelectChange"
    ></page-search>
    <page-content
      :table-data="chapterListData"
      :total="total"
      :content-config="contentConfig"
      @handle-current-change="getChapterData"
      @handle-size-change="getChapterData"
      @handle-edit="handleEdit"
    ></page-content>
    <page-model
      :model-config="modelConfig"
      ref="modelRef"
      @get-page-data="getPageData"
    ></page-model>
  </div>
</template>

<script setup lang="ts" name="chapter">
import { ref, computed } from "vue";
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import { getCartoonListRequest } from "@/service/main/cartoon/comic";
import {
  getChapterList,
  getComicChapterListRequest,
} from "@/service/main/cartoon/chapter";

import usePageSearch from "@/hooks/usePageSearch";

import usePageModel from "@/hooks/usePageModel";
const { modelRef, handleEdit } = usePageModel();

const currentComicId = ref<number>(1);
const currentChapterId = ref<number>(1);
// 搜索框值改变
function handleSelectChange(searchItems: any) {
  if (currentComicId.value != searchItems.comic_id) {
    currentComicId.value = searchItems.comic_id;
    getChapterData();
  }
  currentChapterId.value = searchItems.chapter_id;
}

// 获取chapterData
function getChapterData(page = 0, pageSize = 10, otherInfo?: any) {
  const newInfo = { comic_id: currentComicId.value, ...otherInfo };
  getChapterList({ page, pageSize: 300, ...newInfo }).then((res) => {
    if (res.code == 200) {
      const chapterData = res.data.map((item: any) => {
        return { value: item.chapter_id, label: item.chapter_name };
      });
      searchConfig.formItems.forEach((item: any) => {
        if (item.prop === "chapter_id") {
          item.options = chapterData;
        }
      });
    }
  });
}

// 动态获取options
const searchConfigRef = computed(() => {
  getCartoonListRequest({}).then((res) => {
    const data = res.data.map((item: any) => {
      return { value: item.comic_id, label: item.comic_name };
    });
    searchConfig.formItems.forEach((item: any) => {
      if (item.prop === "comic_id") {
        item.options.push(...data);
      }
    });
  });
  return searchConfig; // 返回什么 什么就是依赖值 当依赖值改变时会
});

const chapterListData = ref<any>();
const total = ref<number>();
function getPageData() {
  getComicChapterListRequest(currentComicId.value, currentChapterId.value).then(
    (res) => {
      if (res.code == 200) {
        chapterListData.value = res.data;
      }
    }
  );
}
const { handleQuery, handleReset } = usePageSearch(
  getPageData,
  undefined,
  reset
);
function reset() {
  currentChapterId.value = 1;
  currentComicId.value = 1;
}
</script>

<style scoped>
.chapter {
}
</style>
