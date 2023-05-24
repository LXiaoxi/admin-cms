<template>
  <div class="film">
    <page-search :search-config="searchConfig"></page-search>
    <page-content
      :table-data="filmData"
      :total="total"
      :content-config="contentConfig"
      @handle-current-change="getPageData"
      @handle-size-change="getPageData"
      @handle-edit="handleEdit"
      @handle-new="handleNew"
      @handle-delete="getPageData"
    >
      <template #info="scope">
        <el-link type="primary" @click="handleViewDetails(scope.row.info)"
          >查看</el-link
        >
      </template>
    </page-content>
    <page-model
      ref="modelRef"
      :model-config="modelConfig"
      @get-page-data="getPageData"
    ></page-model>
    <page-model
      ref="detailRef"
      :model-config="showModelConfig"
      @get-page-data="getPageData"
    ></page-model>
  </div>
</template>

<script setup lang="ts" name="film">
import { ref } from "vue";
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import searchConfig from "./config/search.config";
import contentConfig from "./config/content.config";
import modelConfig from "./config/model.config";
import showModelConfig from "./config/show.model.config";

import { getVideoFilmListRequest } from "@/service/main/video/film";

import usePageModel from "@/hooks/usePageModel";

const { modelRef, handleEdit, handleNew } = usePageModel();

const filmData = ref<any>();
const total = ref<number>();
function getPageData(page = 0, pageSize = 10) {
  getVideoFilmListRequest({ page, pageSize }).then((res) => {
    if (res.code == 200) {
      filmData.value = res.data;
      total.value = res.total;
    }
  });
}
getPageData();
// const isShowEdit = ref<boolean>(false);

// const modelConfigRef = computed(() => {
//   if (isShowEdit.value) {
//     // 点击编辑
//     return modelConfig;
//   } else {
//     return showModelConfig;
//   }
// });
// // 是否显示查看/编辑
// function edit() {
//   isShowEdit.value = true;
// }

const detailRef = ref<InstanceType<typeof pageModel>>();
function handleViewDetails(item: any) {
  let newObj: any = {};

  Object.keys(item).forEach((i: any) => {
    if (item[i]) {
      // 对象的value是否有值
      // 外面添加一个新属性 遍历Object.keys(item) 判断是否符合条件
      // 符合: newOb重新设置值, 要把之前的值也添加进来 就只会返回一个对象
      // [] 可以是计算属性
      newObj = { [i]: item[i], ...newObj };
    }
  });
  if (Object.keys(newObj).length === 1 && newObj.id) {
    detailRef.value?.setModalVisible(true, newObj);
  } else {
    detailRef.value?.setModalVisible(false, item);
  }
}
// 逻辑
// 创建两个配置文件
// modelConfig的数据使用计算属性
// 当点击查看时 返回showModelConfig的配置文件
// 当点击编辑时 返回modelConfig的配置文件
</script>

<style scoped>
.film {
}
</style>
