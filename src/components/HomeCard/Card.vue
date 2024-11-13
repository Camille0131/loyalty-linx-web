<script setup>
import { ref, onMounted, defineEmits } from "vue";
import modal from "../modal/modals.vue";
import { initModals } from "flowbite";
import Table from "../tables/Table.vue";
// onMounted(() => {
//   initModals();
// });

let showModal = ref(false);

const props = defineProps(["item", "index", "history"]);

const historyButton = () => {
  // console.log(props.item);
};

const hideModal = () => {
  showModal.value = false;
};

const unHideModal = () => {
  showModal.value = true;
};
</script>

<template>
  <li
    class="w-full py-5 pt-6 px-4 bg-gradient-to-r from-amber-200 to-amber-400 border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
          <button class="cursor-pointer mt-2 w-full" @click="unHideModal">
            <p
              class="flex justify-center bg-amber-700 text-[.8rem] rounded-md text-white px-2 py-1 text-center hover:bg-amber-800"
            >
              <img
                class="w-[1rem] mr-1"
                src="../../assets/img/home/history-svgrepo-com.svg"
                alt=""
              />
              History
            </p>
          </button>
          <div>
            <!-- <modal :history="history" id="static-modal" /> -->
            <div
              tabindex="-1"
              aria-hidden="true"
              :class="{ hidden: !showModal }"
              class="flex overflow-y-auto bg-[#00000033] overflow-x-hidden h-full item-center fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
            >
              <div class="p-4 w-full max-w-2xl">
                <!-- Modal content -->
                <div
                  class="relative bg-white rounded-sm shadow dark:bg-gray-700"
                >
                  <!-- Modal header -->
                  <div
                    class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                  >
                    <h3
                      class="text-xl font-semibold text-gray-900 dark:text-white"
                    >
                      History
                    </h3>
                    <button
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="hideModal"
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <!-- Modal body -->
                  <div class="w-full">
                    <div class="overflow-x-auto sm:rounded-lg">
                      <div
                        class="h-[20rem] mb-[12rem] rounded-lg pb-2.5 dark:border-strokedark dark:bg-boxdark xl:pb-1"
                      >
                        <div v-for="(item, index) in history" :key="item.name">
                          <Table :data="item" :key="index" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Modal footer -->
                  <div
                    class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
                  >
                    <button
                      @click="hideModal"
                      type="button"
                      class="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main modal -->
      </div>
    </div>
  </li>
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
