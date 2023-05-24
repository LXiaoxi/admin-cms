<template>
  <div class="page-tab">
    <template v-for="item in categoryData">
      <span class="title" @click="handleChangeTab(item.id)">
        {{ item.name }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
interface IProp {
  categoryData: any[];
}
const props = defineProps<IProp>();
const emit = defineEmits(["handleChangeTab"]);
function handleChangeTab(id: number) {
  emit("handleChangeTab", id);
}
</script>

<style lang="less" scoped>
.title {
  padding: 10px;
  cursor: pointer;
}
</style>
