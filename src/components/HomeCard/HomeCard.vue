<script setup>
import { useRoute } from "vue-router";
import { useNavBarStore } from "..//../stores/navbar";
import { ref } from "vue";
import HistoryTable from "./HistoryTable.vue";
import Services from "./Services.vue";
const props = defineProps(["item", "index", "points", "credits"]);

function historyButton() {
  alert("this any message");
}

const isActive = ref(false);
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
            <div class="cursor-pointer">
              <button
                type="button"
                @click="historyButton"
                class="flex justify-center bg-amber-700 text-[.8rem] rounded-md mt-2 text-white px-2 py-1 text-center hover:bg-amber-800"
              >
                <img
                  class="w-[1rem] mr-1"
                  src="../../assets/img/home/history-svgrepo-com.svg"
                  alt=""
                />
                <p>History</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
