<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <div class="tabs">
      <el-tabs v-model="actionName" type="border-card" stretch>
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <login-account ref="accountRef"></login-account>
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <login-phone ref="phoneRef"></login-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox
        type="primary"
        v-model="isRememberPw"
        label="记住密码"
        size="large"
      />
      <el-link type="primary" size="large">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLogin"
      >登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loginAccount from "./login-account.vue";
import loginPhone from "./login-phone.vue";

const isRememberPw = ref(true);
const actionName = ref("account");

const accountRef = ref<InstanceType<typeof loginAccount>>();
const phoneRef = ref<InstanceType<typeof loginPhone>>();
const handleLogin = () => {
  if (actionName.value == "account") {
    accountRef.value!.loginAccount(isRememberPw.value);
  } else {
    phoneRef.value!.loginPhone(isRememberPw.value);
  }
};
</script>

<style scoped lang="less">
.login-panel {
  width: 300px;
  height: 300px;

  .title {
    text-align: center;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        padding: 0 5px;
      }
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
