<template>
  <div class="user-content">
    <div class="top">
      <h3 class="title">{{ contentConfig.title }}</h3>
      <div class="new-btn" v-if="contentConfig.isNewShow ?? true">
        <el-button @click="handleNew">新建</el-button>
      </div>
    </div>
    <div class="center">
      <el-table :data="tableData" stripe style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.tableItems" :key="item.prop">
          <template v-if="item.type == 'operation'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <div class="edit">
                  <el-link type="primary" :underline="false" @click="handleEdit(scope.row)">
                    编辑
                  </el-link>
                  <el-link type="danger" :underline="false" @click="handledelete(scope.row)">
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
          <template v-else-if="item.type == 'state'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button type="primary" size="small" v-if="scope.row[item.prop]">
                  启用
                </el-button>
                <el-button type="danger" size="small" v-else>禁用</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type == 'image'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row[item.prop]"
                ></el-image>
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
import { detelePagePequest } from "@/service/main/permission/user";
import { ElMessage } from "element-plus";

interface IProps {
  tableData?: any; // 要展示的数据
  total?: number; // 总条数
  contentConfig: {
    title: string;
    tableItems: any;
    pageName: string;
    childrenTree?: any;
    otherInfo?: string;
    fieldName?: string;
    isNewShow?: boolean;
    isId?: boolean;
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
function handledelete(item: any) {
  let pageName = `${prop.contentConfig.fieldName ?? prop.contentConfig.pageName}_id`;
  if (prop.contentConfig.isId) {
    pageName = "id";
  }
  const id = item[`${pageName}`];
  console.log(pageName);
  detelePagePequest(prop.contentConfig.pageName, id, prop.contentConfig?.otherInfo).then((res) => {
    if (res.code == 200) {
      emit("handleDelete");
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    }
  });
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
