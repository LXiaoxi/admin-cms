<template>
  <div class="user-content">
    <div class="top">
      <h3 class="title">{{ contentConfig.title }}</h3>
      <div class="new-btn"><el-button @click="handleNew">新建</el-button></div>
    </div>
    <div class="center">
      <el-table :data="tableData" stripe style="width: 100%">
        <template v-for="item in contentConfig.tableItems" :key="item.prop">
          <template v-if="item.type == 'operation'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <div class="edit">
                  <el-link type="primary" :underline="false" @click="handleEdit(scope.row)">
                    编辑
                  </el-link>
                  <el-link
                    type="danger"
                    :underline="false"
                    @click="handledelete(scope.row.user_id)"
                  >
                    删除
                  </el-link>
                </div>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type == 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatTime(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item">
              <template v-if="item.slotName" #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="bottom">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        class="pagination"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formatTime } from "@/util/format";

interface IProps {
  tableData: any;
  total: number;
  contentConfig: {
    title: string;
    tableItems: any;
  };
}
const emit = defineEmits([
  "handleCurrentChange",
  "handleSizeChange",
  "handleEdit",
  "handleNew",
  "handleDelete",
]);
const prop = defineProps<IProps>();
// 分页
const currentPage = ref(1);
const pageSize = ref(10);

function handleSizeChange() {
  emit("handleSizeChange", currentPage.value - 1, pageSize.value);
}

function handleCurrentChange() {
  emit("handleCurrentChange", currentPage.value - 1, pageSize.value);
}

function handleNew() {
  emit("handleNew");
}

function handleEdit(item: any) {
  emit("handleEdit", item);
}
function handledelete(id: number) {
  emit("handleDelete", id);
}
</script>

<style lang="less" scoped>
.user-content {
  background-color: #fff;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 10px;
}
.el-link {
  padding: 0 10px !important;
}
.bottom {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>
