<script setup>
import { ref, onMounted } from "vue";

import { initModals } from "flowbite";
import HomeCarousel from "./HomeCard/HomeCarousel.vue";
import Services from "./HomeCard/Services.vue";
import ApplyCreditPath from "../assets/img/home/loan-svgrepo-com.svg";
import PayCreditsPath from "../assets/img/home/pay-per-click-cursor-svgrepo-com.svg";
import CovertPointsPath from "../assets/img/home/exchange-svgrepo-com.svg";
import RedeemPath from "../assets/img/home/gift-svgrepo-com.svg";
import DiscoverDealsPath from "../assets/img/home/open-box-svgrepo-com.svg";
import MorePath from "../assets/img/home/more-horizontal-svgrepo-com.svg";
import HistoryTable from "./HomeCard/HistoryTable.vue";
import Card from "./HomeCard/Card.vue";
import TransactionHistoryModal from "./modal/TransactionHistoryModal.vue";

const balancesCredits = ref([
  {
    name: "Current credits history",
    label: "Available credits",
    value: "10,200.20",
    id: 1,
  },
]);

const balancesPoints = ref([
  {
    name: "Points earned history",
    label: "Available points",
    value: "2,000.20",
    id: 2,
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

const pointsHistory = ref([
  {
    name: "Points",
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

const props = {
  item: Object,
  index: Number,
  history: Array,
};
</script>

<template>
  <div class="container-services">
    <ul
      id="homeCard"
      class="bg-white mx-3 pb-6 rounded-sm flex flex-row justify-evenly"
    >
      <template v-for="balance in balancesCredits" :key="balance.id"
        >s
        <div
          id="container"
          class="px-2 justify-center rounded-2xl items-center flex flex-col mt-3"
        >
          <Card
            v-for="(balanceItem, index) in balancesCredits"
            :key="index"
            :item="balanceItem"
            :index="index"
            :history="creditHistory"
          />

          <div class="w-full flex flex-row">
            <HistoryTable id="table" :history="creditHistory" />
          </div>
        </div>
      </template>
      <template v-for="history in balancesPoints" :key="history.name">
        <div
          id="container"
          class="px-2 justify-center rounded-2xl items-center flex flex-col mt-3"
        >
          <Card
            v-for="(balancePoint, index) in balancesPoints"
            :key="index"
            :item="balancePoint"
            :index="index"
            :history="pointsHistory"
          />
          <div class="w-full flex flex-row">
            <HistoryTable id="table" :history="pointsHistory" />
          </div>
        </div>
      </template>
    </ul>
    <Services :services="servicesItem" />
    <!-- <TransactionHistoryModal /> -->

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
