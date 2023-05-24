<template>
  <div class="novel">
    <collection :collection-config="categoryCollectionConfig"></collection>

    <collection :collection-config="novelCollectionConfig"></collection>
    <collection :collection-config="infoCollectionConfig"></collection>
  </div>
</template>

<script setup lang="ts" name="novel">
import { ref } from "vue";
import collection from "@/components/collection/collection.vue";

import novelCollectionConfig from "./config/novel.collection.config";
import infoCollectionConfig from "./config/info.collection.config";
import categoryCollectionConfig from "./config/category.collection.config";
</script>
<style scoped lang="less"></style>
