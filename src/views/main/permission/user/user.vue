<template>
  <div class="user">
    <user-search :searchConfig="searchConfig"></user-search>
    <user-content
      :table-data="tableData"
      :total="total"
      :contentConfig="contentConfig"
      @handleCurrentChange="getPageData"
      @handleSizeChange="getPageData"
      @handleEdit="handleEdit"
      @handleNew="handleNew"
      @handleDelete="handleDelete"
    >
      <template #status="scope">
        <el-button type="primary" size="small" v-if="scope.row.state">启用</el-button>
        <el-button type="danger" size="small" v-else>禁用</el-button>
      </template>
    </user-content>
    <user-model
      :modelConfig="modelConfig"
      ref="userModelRef"
      @getPageData="getPageData"
    ></user-model>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import userSearch from "./cpn/user-search.vue";
import userContent from "./cpn/user-content.vue";
import userModel from "./cpn/user-model.vue";
import { searchConfig } from "./config/search.config";
import { contentConfig } from "./config/conten.config";
import modelConfig from "./config/model.config";

import { deleteUserRequest, getUserListRequest } from "@/service/main/permission/user";
import { ElMessage } from "element-plus";
const tableData = ref();
const total = ref();

getPageData();

function getPageData(page = 0, pageSize = 10) {
  getUserListRequest({ page, pageSize }).then((res) => {
    tableData.value = res.data.list;
    total.value = res.data.total;
  });
}
const userModelRef = ref<InstanceType<typeof userModel>>();
// 编辑
const handleEdit = (item: any) => {
  userModelRef.value?.setModalVisible(false, item);
};
const handleNew = () => {
  userModelRef.value?.setModalVisible();
};
const handleDelete = (id: number) => {
  deleteUserRequest(id).then((res) => {
    if (res.code == 200) {
      ElMessage({
        type: "success",
        message: res.msg,
      });
      getPageData();
    }
  });
};
</script>

<style scoped>
.user {
  border-radius: 5px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: aliceblue;
}
</style>
