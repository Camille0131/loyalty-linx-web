<script setup>
import { ref, computed } from "vue";

const props = defineProps(["item", "index"]);

const progressBarWidth = computed(() => {
  if (!props.item.value) return 0;
  return `${(props.item.used / props.item.max) * 100}%`;
});

const formattedMaxAmount = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(props.item.max);
});

const formattedUsed = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(props.item.used);
});
const formattedCreditAmount = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(props.item.value);
});
</script>

<template>
  <div class="w-full justify-center items-center flex flex-col rounded-md">
    <li
      href="#"
      class="block w-[90%] p-5 my-2 rounded-3xl bg-gradient-to-r from-amber-400 to-amber-600 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="flex flex-col">
        <h5
          class="mb-2 underline underline-offset-4 text-center text-4xl font-bold tracking-tight text-amber-800 dark:text-white"
        >
          {{ formattedCreditAmount }}
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
          <div
            class="bg-amber-600 h-2.5 rounded-full"
            :style="{ width: progressBarWidth }"
          ></div>
        </div>
        <div class="flex justify-between">
          <h1 class="text-gray-700 text-sm mt-2 font-semibold">
            {{ formattedUsed }} Used
          </h1>
          <h1 class="text-gray-700 text-sm mt-2 font-semibold">
            {{ formattedMaxAmount }} Limit
          </h1>
        </div>
      </div>
    </li>
  </div>
</template>
