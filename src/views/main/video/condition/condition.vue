<template>
  <div class="condition">
    <page-search
      :search-config="searchConfigRef"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
      @handle-select-change="handleSelectChange"
    ></page-search>
    <page-tab
      :category-data="conditionData"
      @handle-change-tab="handleChangeTab"
    ></page-tab>
    <page-content
      :table-data="subConditionData"
      :total="1"
      :content-config="contentConfig"
      @handle-new="handleNew"
      @handle-edit="handleEdit"
      @handle-delete="getPageData"
    ></page-content>
    <page-model
      ref="modelRef"
      :other-info="otherInfo"
      :model-config="modelConfig"
      @get-page-data="getPageData"
    ></page-model>
  </div>
</template>

<script setup lang="ts" name="condition">
import { ref, computed } from "vue";

import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";
import pageTab from "@/components/page-tab/page-tab.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import { getVideoCategoryRequest } from "@/service/main/video/category";
import { getVideoCondition } from "@/service/main/video/condition";

import usePageSearch from "@/hooks/usePageSearch";
import usePageModel from "@/hooks/usePageModel";

const { modelRef, handleEdit, handleNew } = usePageModel(edit);
function edit(item: any) {
  modelRef.value?.setModalVisible(false, { ...otherInfo.value, ...item });
}

const currentConditionId = ref<number>();

const searchConfigRef = computed(() => {
  getVideoCategoryRequest().then((res) => {
    if (res.code == 200) {
      searchConfig.formItems.forEach((item: any) => {
        if (item.prop == "category_id") {
          const data = res.data.map((item: any) => {
            return { value: item.id, label: item.category_name };
          });
          item.options.push(...data);
        }
      });
    }
  });
  return searchConfig;
});

const otherInfo = ref<any>();
let curretnCategoryId = 1;
const conditionData = ref<any>();
const subConditionData = ref<any>();
function getPageData(conditionId?: number) {
  subConditionData.value = null;
  getVideoCondition(curretnCategoryId).then((res) => {
    if (res.code == 200) {
      conditionData.value = res.data.map((item: any) => {
        return { id: item.condition_id, name: item.condition_name };
      });
      if (!conditionId) {
        conditionId = conditionData.value[0]?.id;
      }
      res.data.forEach((item: any) => {
        if (item.condition_id === conditionId) {
          otherInfo.value = {
            // id: item.id,
            category_id: item.category_id,
            condition_name: item.condition_name,
            condition_id: item.condition_id,
          };
          subConditionData.value = item.children ?? [];
        }
      });
    }
  });
}
const { handleQuery, handleReset } = usePageSearch(getPageData);
getPageData();

// tab切换
function handleChangeTab(id: number) {
  if (currentConditionId.value == id) return;
  currentConditionId.value = id;
  getPageData(currentConditionId.value);
}

// select切换
function handleSelectChange(searchForm: any) {
  curretnCategoryId = searchForm.category_id;
}
</script>

<style scoped>
.condition {
}
</style>
