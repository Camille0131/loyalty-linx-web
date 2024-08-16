<script setup>
import { ref } from "vue";
import PointsCard from "./PointsCard/PointsCard.vue";
import PointsHistory from "./PointsCard/PointsHistory.vue";

const props = ["item, index"];

const balances = ref([
  {
    balanceItems: [
      {
        label: "Total credits",
        value: "10,200.20",
        id: 1,
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
    <PointsHistory :brands="brandDatas" />
  </template>
</template>
