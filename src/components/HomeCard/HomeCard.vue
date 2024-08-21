<script setup>
import { useRoute } from "vue-router";
import { useNavBarStore } from "..//../stores/navbar";
import { ref } from "vue";
import HistoryTable from "./HistoryTable.vue";
import Services from "./Services.vue";
const props = defineProps(["item", "index", "points", "credits"]);
</script>

<template>
  <div
    id="container"
    class="px-2 justify-center rounded-2xl items-center flex flex-col mt-3"
  >
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
    <!-- <div class="w-full"> -->
    <!-- <TableHistory /> -->
    <!-- <HistoryTable id="table" :brands="credits" />
    </div> -->
    <!-- <div class="w-full mb-4" id="table">
      <div class="relative overflow-x-auto sm:rounded-lg">
        <p class="font-bold text-lg mt-4 mx-4">{{ item.name }}</p>
        <div class="h-px w-[95%] mx-auto bg-slate-200"></div>

      </div>
    </div> -->
  </div>
</template>

<style>
#container {
  width: 45%;
}
@media (max-width: 765px) {
}

@media (max-width: 995px) {
  #table {
    display: none;
  }
  #image {
    width: 20%;
  }
}
@media (min-width: 995px) {
  #buttonHistory {
    display: none;
  }
}
</style>
