<script setup>
import { ref } from "vue";
import Pointstable from "./Pointstable.vue";
const props = defineProps(["brands"]);
</script>

<template>
  <div class="w-full p-4">
    <div class="overflow-x-auto sm:rounded-lg p-2">
      <div
        class="h-[30rem] rounded-lg shadow-xl bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">
          Points earned history
        </h4>
        <div v-for="(brand, index) in brands" :key="brand.name">
          <Pointstable :brand="brand" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>
