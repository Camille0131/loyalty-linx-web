<script setup>
import { ref } from "vue";
import Table from "../tables/Table.vue";
const props = defineProps(["history"]);
</script>

<template>
  <div class="w-full">
    <div class="overflow-x-auto sm:rounded-lg">
      <div
        class="h-[20rem] mb-[12rem] rounded-lg pb-2.5 dark:border-strokedark dark:bg-boxdark xl:pb-1"
      >
        <div class="mb-4">
          <h2 class="font-bold font-md m-1">History</h2>
          <div class="h-px w-full bg-slate-200"></div>
        </div>
        <div v-for="(item, index) in history" :key="item.name">
          <Table :data="item" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>
