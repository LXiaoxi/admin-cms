<template>
  <div class="mian-header">
    <el-link @click="handleExitLogin">退出登录</el-link>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

import { localCache } from "@/util/cache";
import { ElMessage } from "element-plus";

const handleExitLogin = () => {
  localCache.removeCache("phoneToken");
  localCache.removeCache("userToken");
  localCache.removeCache("userMenu");
  localCache.removeCache("userInfo");
  ElMessage({
    type: "success",
    message: "已退出登录",
  });
  router.push("/login");
};
</script>

<style lang="less" scoped></style>
