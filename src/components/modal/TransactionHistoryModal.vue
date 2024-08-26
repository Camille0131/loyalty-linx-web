<!-- TransactionHistoryModal.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { initModals } from "flowbite";
import Table from "../tables/Table.vue";

defineProps({
  histories: {
    type: Array,
    // required: true,
  },
  props: ["item", "index"],
});

const isActive = ref(false);

const closeModal = () => {
  isActive.value = !!isActive.value;
};

function openModal() {
  isActive.value = true;
}

const creditHistory = ref([
  {
    name: "Money transfer",
    points: "3.5k",
    dateAndTime: "August 2, 2024 : 09:42 p.m",
    action: "Transfer money to (jp amando) ",
  },
  {
    name: "Loan",
    points: 2.2,
    dateAndTime: "August 2, 2024 : 08:27 p.m",
    action: "SM loan express",
  },
  {
    name: "Purchase",
    points: 2.1,
    dateAndTime: "August 4, 2024 : 06:34 a.m",
    action: "Bearbrand (1.5 liter)",
  },
  {
    name: "Purchase",
    points: 1.5,
    dateAndTime: "July 18, 2024 : 07:12 a.m",
    action: "Chicken Nuggets (Pure Foods)",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "August 5, 2024 : 12:00 p.m",
    action: "Sleepers (SM)",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "June 19, 2024 : 02:27 p.m",
    action: "Hotdog (7/11)",
  },
  {
    name: "Redemption",
    points: 3.5,
    dateAndTime: "July 21, 2024 : 05:42 a.m",
    action: "From Groceries",
  },
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "August 4, 2024 : 10:21 p.m",
    action: "Keyboard (SM)",
  },
]);
</script>
<template>
  <button
    data-modal-target="timeline-modal"
    data-modal-toggle="timeline-modal"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    Toggle modal
  </button>
  <div
    id="timeline-modal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <slot />
    </div>
  </div>
</template>
