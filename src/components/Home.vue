<script setup>
import { ref } from "vue";
import HomeCardVue from "./HomeCard/HomeCard.vue";
import HomeCarousel from "./HomeCard/HomeCarousel.vue";
import DataStats from "./HomeCard/DataStats.vue";
import TableHistory from "./tables/TableHistory.vue";
import Services from "./HomeCard/Services.vue";
import ApplyCreditPath from "../assets/img/home/loan-svgrepo-com.svg";
import PayCreditsPath from "../assets/img/home/pay-per-click-cursor-svgrepo-com.svg";
import CovertPointsPath from "../assets/img/home/exchange-svgrepo-com.svg";
import RedeemPath from "../assets/img/home/gift-svgrepo-com.svg";
import DiscoverDealsPath from "../assets/img/home/open-box-svgrepo-com.svg";
import MorePath from "../assets/img/home/more-horizontal-svgrepo-com.svg";
const balances = ref([
  {
    balanceItems: [
      {
        name: "Current credits history",
        label: "Available credits",
        value: "20,000.00",
        id: 1,
      },
      {
        name: "Points earned history",
        label: "Available points",
        value: "2,000.20",
        id: 2,
      },
    ],
  },
]);

const servicesItem = ref([
  {
    id: 1,
    name: "Apply Credit",
    path: ApplyCreditPath,
  },
  {
    id: 2,
    name: "Pay Credits",
    path: PayCreditsPath,
  },
  {
    id: 3,
    name: "Convert Points",
    path: CovertPointsPath,
  },
  {
    id: 4,
    name: "Redeem",
    path: RedeemPath,
  },
  {
    id: 5,
    name: "Discover Deals",
    path: DiscoverDealsPath,
  },
  {
    id: 6,
    name: "more",
    path: MorePath,
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
  <!-- <div>
    <HomeCarousel id="carousel" />
  </div> -->
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

  <Services :services="servicesItem" />

  <div class="px-6">
    <HomeCarousel />
  </div>
  <div class="h-[4rem]"></div>
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
