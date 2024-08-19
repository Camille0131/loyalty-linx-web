<script setup>
import { ref } from "vue";

const props = defineProps(["item", "index"]);
</script>

<template>
  <div
    class="w-full justify-center items-center flex flex-col rounded-md hover:shadow-xl"
  >
    <li
      href="#"
      class="block w-[90%] p-5 my-2 rounded-3xl bg-gradient-to-r from-amber-400 to-amber-600 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div>
        <h2 class="text-md font-bold text-gray-900 dark:text-white">
          Due Date
        </h2>
        <p class="font-semibold text-red text-sm">{{ item.dueDate }}</p>
      </div>
      <div class="flex flex-col">
        <h5
          class="mb-2 underline underline-offset-4 text-center text-4xl font-bold tracking-tight text-amber-800 dark:text-white"
        >
          {{ item.value }}
        </h5>
        <div>
          <p
            class="font-medium text-center font-semibold py-2 text-sm text-gray-700 dark:text-gray-400"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
      <div v-if="item.progress">
        <div class="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div class="bg-amber-600 h-2.5 rounded-full" style="width: 45%"></div>
        </div>
        <div class="flex justify-end">
          <h1 class="text-gray-700 text-sm font-semibold">
            {{ item.min }} min
          </h1>
        </div>
      </div>
    </li>
  </div>
</template>
