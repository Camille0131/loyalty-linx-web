<script setup>
import { ref } from "vue";
const props = defineProps(["data", "index"]);
</script>

<template>
  <div class="flex flex-col">
    <div
      :class="` flex flex-row my-3   rounded-sm bg-white sm:grid-cols-3 hover:bg-gray-50 
      ${
        index === data.length - 1
          ? ''
          : 'border-b border-stroke dark:border-strokedark'
      }`"
    >
      <div class="flex col-span-1 w-auto items-center p-2.5 xl:p-5">
        <div class="flex-shrink-0 border p-3 rounded-lg">
          <img
            src="../../assets/img/bag-shopping-solid.svg"
            alt=""
            class="h-10"
          />
        </div>
      </div>

      <div class="flex-1 items-center justify-center p-2.5 xl:p-5">
        <div>
          <p
            class="text-gray-700 text-lg font-semibold dark:text-white sm:block"
          >
            {{ data.name }}
          </p>
        </div>
        <div>
          <p class="text-black dark:text-white text-sm sm:block">
            {{ data.action }}
          </p>
        </div>
        <div>
          <p class="text-gray-500 text-s m dark:text-white sm:block">
            {{ data.dateAndTime }}
          </p>
        </div>
      </div>

      <div
        class="flex flex-2 items-center justify-center text-center p-2.5 xl:p-5"
      >
        <p class="text-black dark:text-white">+{{ data.points }}</p>
      </div>
    </div>
  </div>
</template>
