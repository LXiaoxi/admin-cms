<template>
  <div class="login-account">
    <el-form
      :rules="accountRules"
      :model="formData"
      label-width="60px"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号:" prop="user_name">
        <el-input v-model="formData.user_name" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="formData.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { ElForm, FormRules } from "element-plus";

import useLoginStore from "@/store/login/login";

import type { IAccount } from "@/types";
import { localCache } from "@/util/cache";
const uselogin = useLoginStore();
const formData = ref<IAccount>({
  user_name: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? "",
});

const accountRules: FormRules = {
  user_name: [
    { required: true, message: "必须输入用户名", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{5,14}$/,
      message: "必须是5~10位字母或数字组成",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "必须输入密码", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "必须是3位以上字母或数字组成",
      trigger: "blur",
    },
  ],
};
const formRef = ref<InstanceType<typeof ElForm>>();
function loginAccount(isRememberPw: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 发送网络请求
      uselogin.loginAccountAction(formData.value).then((res) => {
        if (isRememberPw) {
          localCache.setCache("name", formData.value.user_name);
          localCache.setCache("password", formData.value.password);
        } else {
          localCache.removeCache("name");
          localCache.removeCache("password");
        }
      });
    } else {
      ElMessage({
        type: "error",
        message: "验证失败",
      });
    }
  });
}

defineExpose({
  loginAccount,
});
</script>

<style scoped></style>
