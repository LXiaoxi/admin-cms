<template>
  <div class="video">
    <collection :collection-config="coditionCollectionConfig"></collection>
    <collection :collection-config="filmCollectionConfig"></collection>
    <collection :collection-config="detailCollectionConfig"></collection>
    <collection :collection-config="playCollectionConfig"></collection>
  </div>
</template>

<script setup lang="ts" name="video">
import collection from "@/components/collection/collection.vue";

import coditionCollectionConfig from "./config/condition.config";
import filmCollectionConfig from "./config/film.config";
import detailCollectionConfig from "./config/detail.config";
import playCollectionConfig from "./config/play.config";
</script>

<style scoped>

</style>
