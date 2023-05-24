<template>
  <div class="feedback">
    <pageSearch :search-config="searchConfig"></pageSearch>
    <pageContent :total="total" :table-data="feedbackData" :content-config="contentConfig">
      <template #handle="scope">
        <span>{{ scope.row.operation_state == 0 ? "未处理" : "已处理" }}</span>
      </template>
      <template #operation="scope">
        <div class="operation">
          <el-link
            v-if="scope.row.operation_state == 0"
            type="primary"
            :underline="false"
            @click="handleClick(scope.row.id)"
          >
            处理
          </el-link>
          <el-link type="danger" :underline="false" @click="handleDelete(scope.row.id)">
            删除
          </el-link>
        </div>
      </template>
    </pageContent>
  </div>
</template>

<script setup lang="ts" name="feedback">
import pageSearch from "@/components/page-search/page-search.vue";
import pageContent from "@/components/page-content/page-content.vue";
import pageModel from "@/components/page-model/page-model.vue";

import contentConfig from "./config/content.config";
import searchConfig from "./config/search.config";

import {
  getFeedbackListRequest,
  deleteFeedbackRequest,
  handleFeedbackRequest,
} from "@/service/main/feedback/feedback";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const feedbackData = ref<any>();
let total = ref<number>();
function getPageData() {
  getFeedbackListRequest({ page: 0, pageSize: 10 }).then((res) => {
    if (res.code == 200) {
      feedbackData.value = res.data;
      total.value = res.total;
    }
  });
}
function common(msg: string) {
  ElMessage({
    type: msg == "成功" ? "success" : "error",
    message: msg,
  });
  getPageData();
}
function handleClick(id: number) {
  handleFeedbackRequest(id).then((res) => {
    common(res.msg);
  });
}
function handleDelete(id: number) {
  deleteFeedbackRequest(id).then((res) => {
    common(res.msg);
  });
}

getPageData();
</script>

<style scoped lang="less">
.operation {
  display: flex;
  justify-content: space-around;
}
</style>
