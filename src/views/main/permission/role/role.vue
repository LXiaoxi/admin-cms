<template>
  <div class="role">
    <page-search
      :searchConfig="searchConfig"
      @handle-query="handleQuery"
    ></page-search>
    <page-content
      ref="contentRef"
      :tableData="roleData"
      :total="total"
      :contentConfig="contentConfig"
      @handle-current-change="getPageData"
      @handle-size-change="getPageData"
      @handle-edit="handleEdit"
      @handle-new="handleNew"
      @handle-delete="getPageData"
    ></page-content>

    <page-model
      :modelConfig="modelConfig"
      :otherInfo="otherInfo"
      ref="modelRef"
      @get-page-data="getPageData"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenu"
          show-checkbox
          node-key="menu_id"
          highlight-current
          :props="{ children: 'subMenu', label: 'name' }"
          @check="handleCheck"
        />
      </template>
    </page-model>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from "vue";
import type { ElTree } from "element-plus";

import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import searchConfig from "./config/search-config";
import contentConfig from "./config/content-config";
import modelConfig from "./config/model-config";

import { getRoleListRequest } from "@/service/main/permission/role";

import useMainStore from "@/store/main/perimission/index";
import usePageModel from "@/hooks/usePageModel";

import { storeToRefs } from "pinia";
const mainStore = useMainStore();
mainStore.getMenuListAction();
const { entireMenu } = storeToRefs(mainStore);
const roleData = ref<any>(null);
const total = ref<number>();

getPageData();
function getPageData(page = 0, pageSize = 10, otherInfo?: any) {
  getRoleListRequest({ page, pageSize, ...otherInfo }).then((res) => {
    if (res.code == 200) {
      roleData.value = res.data;
      total.value = res.total;
    }
  });
}

const { modelRef, handleEdit, handleNew } = usePageModel(editCb);

const treeRef = ref<InstanceType<typeof ElTree>>();
function editCb(item: any) {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(item.menuList);
  });
}

// 菜单树
// 额外数据
const otherInfo = ref({});
function handleCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menuList };
}

const contentRef = ref<InstanceType<typeof pageContent>>();
// 查询
function handleQuery(searForm: any) {
  getPageData(0, 10, searForm);
}
</script>

<style scoped>
.role {
  border-radius: 5px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: aliceblue;
}
</style>
