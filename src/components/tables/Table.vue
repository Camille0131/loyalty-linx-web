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
          <img :src="data.merchantLogo" alt="" class="h-10" />
        </div>
      </div>

      <div class="flex-1 items-center justify-center p-2.5 xl:p-5">
        <div>
          <p
            class="text-gray-700 text-lg font-semibold dark:text-white sm:block"
          >
            {{ data.description }}
          </p>
        </div>

        <div>
          <p
            v-if="data.date"
            class="text-gray-500 text-sm dark:text-white sm:block"
          >
            {{
              new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(new Date(data.date))
            }}
          </p>
        </div>
      </div>

      <div
        class="flex flex-2 items-center justify-center text-center p-2.5 xl:p-5"
      >
        <p class="text-black dark:text-white">+{{ data.amount }}</p>
      </div>
    </div>
  </div>
</template>
