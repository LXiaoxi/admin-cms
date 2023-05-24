<template>
  <div class="user_model">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modelConfig.newTitle : modelConfig.editTitle"
    >
      <el-form :label-width="modelConfig.labelWidth ?? '80px'" :model="modelForm">
        <el-row :gutter="20">
          <template v-for="item in modelConfig.formItems" :key="item.prop">
            <el-col :span="modelConfig.spanWidth ?? 24">
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type == 'input'">
                  <el-input
                    v-model="modelForm[item.prop]"
                    :placeholder="item.placeholder"
                  ></el-input>
                </template>
                <template v-if="item.type == 'date-picker'">
                  <el-date-picker
                    v-model="modelForm[item.prop]"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  />
                </template>
                <template v-if="item.type == 'image'">
                  <el-image
                    :src="modelForm[item.prop]"
                    style="width: 100px; height: 100px"
                  ></el-image>
                </template>
                <template v-if="item.type == 'custom'">
                  <slot :name="item.slotName"></slot>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="isShowBtn">
          <el-button @click="handleConfirmClick" type="primary">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { newPageRequest, updatePageRequest } from "@/service/main/permission/user";
import { ElMessage } from "element-plus";

interface IProps {
  modelConfig: {
    labelWidth?: string;
    spanWidth?: number;
    otherInfo?: string;
    isId?: boolean;
    pageName: string;
    newTitle: string;
    editTitle: string;
    formItems: any[];
  };
  otherInfo?: any;
  isShowBtn?: boolean;
}
const emit = defineEmits(["getPageData"]);
// const props = defineProps<IProps>();
// props设置默认值
const props = withDefaults(defineProps<IProps>(), {
  isShowBtn: true,
});

let dialogVisible = ref(false);
const isNewRef = ref(true);

const initralForm: any = {};
for (const item of props.modelConfig.formItems) {
  initralForm[item.prop] = item.initralValue ?? "";
}
const modelForm = reactive<any>(initralForm);

const editData = ref<any>(null);
const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true;
  isNewRef.value = isNew;
  if ((!isNew && itemData) || (isNew && itemData)) {
    for (const key in modelForm) {
      modelForm[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    for (const key in modelForm) {
      modelForm[key] = [];
    }
    editData.value = null;
  }
};

// 确定按钮
const handleConfirmClick = async () => {
  let info = modelForm;
  if (props.otherInfo) {
    info = { ...modelForm, ...props.otherInfo };
  }

  let fieldName = `${props.modelConfig.otherInfo ?? props.modelConfig.pageName}_id`;
  if (props.modelConfig.isId) {
    fieldName = "id";
  }
  if (!isNewRef.value && editData.value) {
    // 编辑
    const editRes = await updatePageRequest(
      props.modelConfig.pageName,
      editData.value?.[`${fieldName}`],
      info,
      props.modelConfig?.otherInfo
    );
    if (editRes.code == 200) {
      emit("getPageData"),
        ElMessage({
          type: "success",
          message: "编辑成功",
        });
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "warning",
        message: editRes.msg,
      });
    }
  } else {
    // 新建
    const newRes = await newPageRequest(
      props.modelConfig.pageName,
      info,
      props.modelConfig?.otherInfo
    );
    if (newRes.code == 200) {
      emit("getPageData");
      ElMessage({
        type: "success",
        message: "新建成功",
      });
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "warning",
        message: newRes.msg,
      });
    }
  }
};

defineExpose({
  setModalVisible,
});
</script>

<style lang="less" scoped></style>
