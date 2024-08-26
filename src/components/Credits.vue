<script setup>
import { ref } from "vue";
import PointsCard from "./PointsCard/PointsCard.vue";
import PointsHistory from "./PointsCard/PointsHistory.vue";
import Services from "./HomeCard/Services.vue";
import ApplyCreditPath from "../assets/img/credits/invoice-apply-line-svgrepo-com.svg";
import PayCreditsPath from "../assets/img/credits/pay-pal-paypal-payments-platform-svgrepo-com.svg";
import StatusIcon from "../assets/img/credits/status-up-svgrepo-com.svg";

import Merchants from "./merchants/Merchants.vue";

const balances = ref([
  {
    balanceItems: [
      {
        label: "Available credits",
        value: "10,200.20",
        id: 1,
        progress: true,
        min: "20,000.00",
        dueDate: "5/2/2025",
      },
    ],
  },
]);
const brandDatas = ref([
  {
    name: "Security Social System",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    name: "TwitterS",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    name: "GithFub",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
]);

const servicesItem = ref([
  {
    id: 1,
    name: "Apply",
    path: ApplyCreditPath,
  },
  {
    id: 2,
    name: "Pay",
    path: PayCreditsPath,
  },
  {
    id: 3,
    name: "Loan Status",
    path: StatusIcon,
  },
]);
</script>

<template>
  <template v-for="balance in balances" :key="balance.id">
    <ul class="flex flex-row justify-evenly">
      <PointsCard
        v-for="(balanceItem, index) in balance.balanceItems"
        :key="index"
        :item="balanceItem"
        :index="index"
      />
    </ul>
  </template>
  <Services :services="servicesItem" />
  <div class="pb-22">
    <Merchants />
  </div>
</template>
