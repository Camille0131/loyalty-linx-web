<script setup>
import { ref } from "vue";

const props = defineProps(["item", "index"]);
</script>

<template>
  <li
    class="w-full py-5 pt-6 px-4 bg-gradient-to-r from-amber-400 to-amber-600 border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="flex flex-row justify-between">
      <div>
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-amber-800 dark:text-white"
        >
          {{ item.value }}
        </h5>
        <p class="font-semibold text-xs text-gray-700 dark:text-gray-400">
          {{ item.label }}
        </p>
      </div>
      <div>
        <div>
          <img
            style="width: 7rem"
            id="image"
            src="../../assets/img/loyaltilinxicon.png"
            alt=""
          />
        </div>
        <div id="buttonHistory">
          <a class="cursor-pointer">
            <p
              class="flex justify-center bg-amber-700 text-[.8rem] rounded-md mt-2 text-white px-2 py-1 text-center hover:bg-amber-800"
            >
              <img
                class="w-[1rem] mr-1"
                src="../../assets/img/home/history-svgrepo-com.svg"
                alt=""
              />
              History
            </p></a
          >
        </div>
      </div>
    </div>
  </li>
</template>
