<template>
  <div class="login-phone">
    <el-form
      :rules="phoneRules"
      :model="formData"
      label-width="80px"
      status-icon
      ref="formRef"
    >
      <el-form-item label="手机号:" prop="phone">
        <el-input v-model="formData.phone" />
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
import type { IPhone } from "@/types";
import { localCache } from "@/util/cache";

const useLogin = useLoginStore();
const formData = ref<IPhone>({
  phone: "",
  password: "",
});

const phoneRules: FormRules = {
  phone: [{ required: true, message: "必须输入手机号", trigger: "blur" }],
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
function loginPhone(isRememberPw: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 发送网络请求
      useLogin.loginPhoneAction(formData.value).then((res) => {
        if (isRememberPw) {
          localCache.setCache("phone", formData.value.phone);
          localCache.setCache("passowrd", formData.value.password);
        } else {
          localCache.removeCache("phone");
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
  loginPhone,
});
</script>

<style scoped></style>
