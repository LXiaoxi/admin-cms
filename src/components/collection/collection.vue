<template>
  <div class="collection">
    <div class="title">
      <span>{{ collectionConfig.title }}</span>
    </div>
    <div class="center">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="formData.linkInfo"
            type="textarea"
            :rows="5"
            :placeholder="otherInfo"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="formData.logInfo"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-button type="primary" @click="handleCollection">开始采集</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { addCollection } from "@/service/main/collection/collection";

interface IProps {
  collectionConfig: {
    title: string;
    pageName: string;
    otherInfo: string;
  };
  otherInfo?: any;
}
const props = defineProps<IProps>();

const formData = reactive<any>({
  linkInfo: "",
  logInfo: "",
});
const otherInfo = ref<any>(props.collectionConfig.otherInfo);
const emit = defineEmits(["handleCollection"]);
async function handleCollection() {
  if (!formData.linkInfo) {
    otherInfo.value = "参数不能为空";
    return;
  }
  formData.logInfo = "开始采集\n";
  const res = await addCollection(
    props.collectionConfig.pageName,
    formData.linkInfo,
    props.otherInfo
  );
  if (res.code === 200) {
    if (!res.data.length)
      return (formData.logInfo = formData.logInfo + " 数据已存在\n");
    for (let i = 0; i < res.data.length; i++) {
      if (res.data[i] == 0) {
        formData.logInfo =
          formData.logInfo +
          "已采集 " +
          `${i + 1}/${res.data.length}` +
          " 数据\n";
      } else if (res.data[i] == 1) {
        formData.logInfo =
          formData.logInfo + `${i + 1}/${res.data.length}` + "数据已存在\n";
      } else if (res.data[i] == 2) {
        formData.logInfo = formData.logInfo + "该章节为付费内容";
      }
    }
    formData.logInfo = formData.logInfo + "结束采集";
  } else {
    formData.logInfo = res.msg;
  }
  emit("handleCollection", formData.linkInfo);
}
</script>

<style lang="less" scoped>
.center,
.footer {
  margin-top: 10px;
}
</style>
