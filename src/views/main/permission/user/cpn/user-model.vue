<template>
  <div class="user_model">
    <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建' : '编辑'">
      <el-form>
        <el-form-item label="手机号" label-width="100px" prop="phone">
          <el-input placeholder="请输入手机号" v-model="formData.phone"> </el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px" prop="user_name">
          <el-input placeholder="请输入用户名" v-model="formData.user_name"> </el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="100px" prop="role">
          <el-select v-model="formData.role_id">
            <template v-for="option in role" :key="option.label">
              <el-option :label="option.label" :value="option.value" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isNewRef" label="密码" label-width="100px" prop="phone">
          <el-input type="password" placeholder="请输入密码" v-model="formData.password">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleConfirmClick" type="primary">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { newUserRequest, updateUserRequest } from "@/service/main/permission/user";
import { ElMessage } from "element-plus";
import { getRoleListRequest } from "@/service/main/permission/role";
const emit = defineEmits(["getPageData"]);
let dialogVisible = ref(false);
const isNewRef = ref(true);
const formData = reactive<any>({
  user_name: "",
  phone: "",
  password: "",
  role_id: "",
});

const role = ref<any>();
function getRoleData() {
  getRoleListRequest({ page: 0, pageSize: 10 }).then((res) => {
    if (res.code == 200) {
      role.value = res.data.map((item: { role_name: string; role_id: number }) => {
        return { label: item.role_name, value: item.role_id };
      });
    }
  });
}
getRoleData();

const editData = ref<any>(null);
const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true;
  isNewRef.value = isNew;
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    for (const key in formData) {
      formData[key] = "";
    }
    editData.value = null;
  }
};

// 确定按钮
const handleConfirmClick = async () => {
  if (!isNewRef.value && editData.value) {
    // 编辑
    const editRes = await updateUserRequest(editData.value?.user_id, formData);
    if (editRes.code == 200) {
      emit("getPageData"),
        ElMessage({
          type: "success",
          message: "编辑成功",
        });
      dialogVisible.value = false;
    }
  } else {
    // 新建
    const newRes = await newUserRequest(formData);
    if (newRes.code == 200) {
      emit("getPageData");
      ElMessage({
        type: "success",
        message: "新建成功",
      });
      dialogVisible.value = false;
    }
  }
};

defineExpose({
  setModalVisible,
});
</script>

<style lang="less" scoped></style>
