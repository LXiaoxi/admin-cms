<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside width="240px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import mainMenu from "@/components/main-menu/main-menu.vue";
import mainHeader from "@/components/main-header/main-header.vue";
</script>

<style scoped lang="less">
.main {
  height: 100%;
  .main-container {
    height: 100%;
    .el-aside {
      background-color: aqua;
    }
    .el-header {
      background-color: aquamarine;
    }
    .el-main {
      background-color: bisque;
    }
  }
}
</style>
