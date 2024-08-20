<script setup>
import { ref } from "vue";
import HomeCardVue from "./HomeCard/HomeCard.vue";
import HomeCarousel from "./HomeCard/HomeCarousel.vue";
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
const brandDatas = ref([
  {
    name: "Purchase",
    points: 3.5,
    dateAndTime: "August 2, 2024 : 09:42 p.m",
    action: "Chatime (Down Town Market) ",
  },
  {
    name: "Purchase",
    points: 2.2,
    dateAndTime: "August 2, 2024 : 08:27 p.m",
    action: "Chatime (Down Town Market)",
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
  <div class="container-services">
    <template v-for="balance in balances" :key="balance.id">
      <ul
        id="homeCard"
        class="bg-white mx-3 pb-6 rounded-sm flex flex-row justify-evenly"
      >
        <HomeCardVue
          v-for="(balanceItem, index) in balance.balanceItems"
          :key="index"
          :item="balanceItem"
          :index="index"
          :brands="brandDatas"
        />
      </ul>
    </template>
    <Services :services="servicesItem" />

    <div class="mx-3">
      <HomeCarousel />
    </div>
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
@media (min-width: 1100px) {
  .container-services {
    padding: 0rem 8rem;
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
