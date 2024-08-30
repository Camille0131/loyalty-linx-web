<script setup>
import { ref, onMounted } from "vue";
import PointsCard from "./PointsCard/PointsCard.vue";
import PointsHistory from "./PointsCard/PointsHistory.vue";
import Services from "./HomeCard/Services.vue";
import ApplyCreditPath from "../assets/img/credits/invoice-apply-line-svgrepo-com.svg";
import PayCreditsPath from "../assets/img/credits/pay-pal-paypal-payments-platform-svgrepo-com.svg";
import StatusIcon from "../assets/img/credits/status-up-svgrepo-com.svg";
import jollibee from "../assets/img/merchants/jollibee.png";
import mcdo from "../assets/img/merchants/mcdo.png";
import amazon from "../assets/img/merchants/amazon.png";
import super8 from "../assets/img/merchants/super8.jpg";
import sm from "../assets/img/merchants/sm.png";
import walmart from "../assets/img/merchants/walmart.png";

import { useUserStore } from "../stores/user";

import Merchants from "./merchants/Merchants.vue";

const merchantEndPoint =
  "https://loyalty-linxapi.vercel.app/api/merchant/get-all";

let merchantData = ref([]);

const getAllMerchant = async (token) => {
  try {
    const response = await fetch(merchantEndPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      merchantData.value = data.merchants;
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.groupEnd(error);
  }
};

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

const merchantsGroup = ref([
  {
    name: "jollibee",
    id: 1,
    path: jollibee,
  },
  {
    name: "mcdonalds",
    id: 2,
    path: mcdo,
  },
  {
    name: "amazon",
    id: 3,
    path: amazon,
  },
  {
    name: "super8",
    id: 4,
    path: super8,
  },
  {
    name: "SM",
    id: 5,
    path: sm,
  },
  {
    name: "walmart",
    id: 6,
    path: walmart,
  },
]);

onMounted(async () => {
  const userStore = useUserStore();
  const token = userStore.token;
  await getAllMerchant(token);
});
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
    <Merchants :item="merchantData" />
  </div>
</template>
