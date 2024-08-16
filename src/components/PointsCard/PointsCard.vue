<script setup>
import { ref } from "vue";

const props = defineProps(["item", "index"]);
</script>

<template>
  <div
    class="bg-white w-full mx-4 justify-center items-center flex flex-col mt-3 rounded-md shadow-lg hover:shadow-xl"
  >
    <li
      href="#"
      class="block w-5/6 rounded-b-3xl m-6 p-6 bg-gradient-to-r from-amber-400 to-amber-600 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="w-full flex justify-end px-14">
        <img
          src="../../assets//img/authimages/loyaltilinx-web-favicon.png"
          alt=""
        />
      </div>
      <div class="flex flex-col justify-center w-full">
        <h5
          class="mb-2 underline underline-offset-4 text-center text-6xl font-bold tracking-tight text-amber-800 dark:text-white"
        >
          {{ item.value }}
        </h5>
        <div>
          <p
            class="font-medium text-center text-md text-gray-700 dark:text-gray-400"
          >
            {{ item.label }}
          </p>
        </div>
      </div>
    </li>
  </div>
</template>
