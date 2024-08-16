<script setup>
import { ref } from "vue";
import HomeCardVue from "./HomeCard/HomeCard.vue";
import HomeCarousel from "./HomeCard/HomeCarousel.vue";
import DataStats from "./HomeCard/DataStats.vue";
import TableHistory from "./tables/TableHistory.vue";

const balances = ref([
  {
    balanceItems: [
      {
        name: "Current credits history",
        label: "Total credits",
        value: "2,000.00",
        id: 1,
      },
      {
        name: "Points earned history",
        label: "Total points",
        value: "20,000.20",
        id: 2,
      },
    ],
  },
]);
</script>

<template>
  <!-- <div class="p-2">
    <h1 class="font-semibold">Whats new?</h1>
    <h4 class="font-medium text-gray-600">
      Experience and enjoy our exciting updates
    </h4>
  </div> -->
  <div>
    <HomeCarousel id="carousel" />
  </div>
  <template v-for="balance in balances" :key="balance.id">
    <ul id="homeCard" class="flex flex-row justify-evenly">
      <HomeCardVue
        v-for="(balanceItem, index) in balance.balanceItems"
        :key="index"
        :item="balanceItem"
        :index="index"
      />
    </ul>
  </template>
</template>

<style>
@media (max-width: 1550px) {
  #carousel {
    margin: auto;
    width: 85%;
  }
}
@media (max-width: 690px) {
  #homeCard {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #container {
    width: 90%;
  }
}
</style>
