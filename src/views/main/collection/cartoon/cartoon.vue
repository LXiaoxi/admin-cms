<template>
  <div class="cartoon">
    <collection :collection-config="comicCollectionConfig"></collection>

    <collection :collection-config="comicInfoCollectionConfig"></collection>
    <collection :collection-config="chapterCollectionConfig"></collection>
  </div>
</template>

<script setup lang="ts" name="cartoon">
import { ref } from "vue";
import collection from "@/components/collection/collection.vue";

import comicCollectionConfig from "./config/comic.collection.config";
import comicInfoCollectionConfig from "./config/info.collection.config";
import chapterCollectionConfig from "./config/chapter.collection.config";
</script>
<style scoped lang="less">
.cartoon {
  .center,
  .footer {
    margin-top: 10px;
  }
}
</style>
