<script setup>
import { ref } from "vue";

const props = defineProps(["brand", "index"]);
</script>

<template>
  <div class="flex flex-col">
    <div
      :class="` grid grid-cols-3 sm:grid-cols-5 hover:bg-gray-50 ${
        index === brand.length - 1
          ? ''
          : 'border-b border-stroke dark:border-strokedark'
      }`"
    >
      <div class="flex items-center gap-3 p-2.5 xl:p-5">
        <div class="flex-shrink-0">
          <img
            src="../../assets/img/bag-shopping-solid.svg"
            alt=""
            class="h-10"
          />
        </div>
        <p class="hidden text-black dark:text-white sm:block">
          {{ brand.name }}
        </p>
      </div>

      <div class="flex items-center justify-center p-2.5 xl:p-5">
        <p class="text-black dark:text-white">{{ brand.visitors }}K</p>
      </div>

      <div class="flex items-center justify-center p-2.5 xl:p-5">
        <p class="text-meta-3">${{ brand.revenues }}</p>
      </div>

      <div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p class="text-black dark:text-white">{{ brand.sales }}</p>
      </div>

      <div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p class="text-meta-5">{{ brand.conversion }}%</p>
      </div>
    </div>
  </div>
</template>
