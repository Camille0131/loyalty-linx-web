<script setup>
import { ref } from "vue";
import jollibee from "../../assets/img/merchants/jollibee.png";
import mcdo from "../../assets/img/merchants/mcdo.png";
import amazon from "../../assets/img/merchants/amazon.png";
import super8 from "../../assets/img/merchants/super8.jpg";
import sm from "../../assets/img/merchants/sm.png";
import walmart from "../../assets/img/merchants/walmart.png";

const props = defineProps(["item"]);

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

const handleMerchant = (name) => {
  console.log(name);
};
</script>
<template>
  <div class="bg-white mx-3 py-2">
    <div class="p-4">
      <h2 class="font-bold font-md m-1">Merchants</h2>
      <div class="h-px w-full bg-slate-200"></div>
    </div>
    <div class="grid grid-cols-3 gap-3 mx-auto px-5">
      <button
        @click="handleMerchant(merchantGroup.storeName)"
        v-for="merchantGroup in item"
        :key="merchantGroup.storeName"
        class="bg-white rounded-md p-2 hover:bg-gray-50"
      >
        <div>
          <img
            class="w-[5rem] mx-auto"
            :src="merchantGroup.profilePicture"
            alt=""
          />
          <p id="name" class="font-semibold text-sm text-gray-700">
            {{ merchantGroup.storeName }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<style>
#name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
