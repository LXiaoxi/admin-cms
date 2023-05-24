<template>
  <div class="user-manage">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    ></page-search>
    <page-content
      :table-data="userData"
      :total="total"
      :content-config="contentConfig"
      @handle-edit="handleEdit"
      @handle-new="handleNew"
      @handle-delete="getPageData"
      @handle-current-change="getPageData"
      @handle-size-change="getPageData"
    >
      <template #status="scope">
        <el-button type="primary" size="small" v-if="scope.row.state">启用</el-button>
        <el-button type="danger" size="small" v-else>禁用</el-button>
      </template>
    </page-content>
    <page-model
      :model-config="modelConfig"
      ref="modelRef"
      @get-page-data="getPageData"
    ></page-model>
  </div>
</template>

<script setup lang="ts" name="user-manage">
import { ref } from "vue";
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";

import { getGeneralUserRequest } from "@/service/main/user/user";
import usePageModel from "@/hooks/usePageModel";
import usePageSearch from "@/hooks/usePageSearch";
const { modelRef, handleEdit, handleNew } = usePageModel();
const { handleQuery, handleReset } = usePageSearch(getPageData);

const userData = ref<any>();
const total = ref<number>();
function getPageData(page = 0, pageSize = 10, otherInfo?: any) {
  getGeneralUserRequest({ page, pageSize, ...otherInfo }).then((res) => {
    if (res.code == 200) {
      userData.value = res.data.list;
      total.value = res.data.total;
    }
  });
}
getPageData();
</script>

<style scoped></style>
