<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = zhCn;
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
}
</style>
