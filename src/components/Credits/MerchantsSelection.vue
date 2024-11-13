<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const router = useRouter();
const props = defineProps(["item"]);
let showModal = ref(false);

const limit = JSON.parse(sessionStorage.getItem("limit"));
const balanceString = JSON.parse(sessionStorage.getItem("u_CRDBAl"));
const balance = parseInt(balanceString); // convert balance to integer

const newBalance = balance + 500;

const handleMerchant = (merchantGroup) => {
  if (newBalance < limit) {
    sessionStorage.setItem("merchantItem", JSON.stringify(merchantGroup));
    router.push({
      name: "apply/credit",
    });
  } else {
    Swal.fire({
      title: "Request fail!",
      text: "Limit exceed!",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        router.replace("/home");
      }
    });
  }
};
</script>

<template>
  <div class="bg-white mx-3 py-2 overflow-y-auto max-h-[33rem]">
    <div class="grid grid-cols-2 gap-3 mx-auto px-5 max-w-100">
      <button
        @click="handleMerchant(merchantGroup)"
        v-for="merchantGroup in item"
        :key="merchantGroup.storeName"
        class="bg-white rounded-md p-2 hover:bg-gray-50"
      >
        <!-- <router-link to="/application/credit"> -->
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
        <!-- </router-link> -->
      </button>
    </div>
  </div>
</template>
