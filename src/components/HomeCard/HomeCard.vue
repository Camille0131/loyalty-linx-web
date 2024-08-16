<script setup>
import { useRoute } from "vue-router";
import { useNavBarStore } from "..//../stores/navbar";
import { ref } from "vue";
import TableHistory from "../tables/TableHistory.vue";
const props = defineProps(["item", "index"]);
</script>

<template>
  <div
    id="container"
    class="bg-white px-5 justify-center rounded-xl items-center flex flex-col mt-3 shadow-lg hover:shadow-xl"
  >
    <li
      href="#"
      class="w-full mt-6 mb-6 p-6 bg-gradient-to-r from-amber-400 to-amber-600 border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div class="w-full flex justify-end">
        <img
          id="image"
          src="../../assets//img/authimages/loyaltilinx-web-favicon.png"
          alt=""
        />
      </div>
      <div>
        <h5
          class="mb-2 text-4xl font-bold tracking-tight text-amber-800 dark:text-white"
        >
          {{ item.value }}
        </h5>
        <p class="font-medium text-gray-700 dark:text-gray-400">
          {{ item.label }}
        </p>
      </div>
    </li>
    <div>
      <!-- <TableHistory /> -->
    </div>
    <div class="w-full p-2 mb-4" id="table">
      <div class="relative overflow-x-auto sm:rounded-lg">
        <p class="font-semibold text-xl mt-4 mx-4">{{ item.name }}</p>
        <TableHistory class="h-72" />
      </div>
    </div>
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
</style>
