<template>
  <div class="user-search">
    <h2>{{ searchConfig.title }}</h2>
    <el-form
      class="form"
      :label-width="searchConfig.labelWidth ?? '80px'"
      :model="searchForm"
      ref="formRef"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="6">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type == 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type == 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <div class="btn">
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from "element-plus";
import { ref, reactive } from "vue";
interface IProps {
  searchConfig: {
    formItems: any[];
    title: string;
    labelWidth?: string;
  };
}
const prop = defineProps<IProps>();

// 不能写死
const initialForm: any = {};
for (const item of prop.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? "";
}

const searchForm = reactive(initialForm);
const formRef = ref<InstanceType<typeof ElForm>>();

// 查询/重置
function handleQuery() {
  console.log(searchForm);
}

function handleReset() {
  formRef.value?.resetFields();
}
</script>

<style lang="less" scoped>
.user-search {
  color: red;
  .form {
    padding: 10px;
  }
  .btn {
    text-align: right;
  }
}
</style>
