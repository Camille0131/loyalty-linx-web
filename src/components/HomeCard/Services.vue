<script setup>
import { ref, toRaw, onMounted } from "vue";
import MerchantsSelection from "../ApplyCredit/MerchantsSelection.vue";
const props = defineProps(["services"]);
const propService = ref(props.services);
const services = toRaw(propService.value); // Convert Proxy to plain array
import { defineEmits } from "vue";

const emit = defineEmits(["serviceClicked"]);



// const unHide = (servicesItem) => {
//   switch (servicesItem.id) {
//     case 1:
//       showModal.value = true;
//       break;
//     case 2:
//       // console.log(servicesItem);
//       break;
//     case 3:
//       // console.log(servicesItem);
//       break;
//     default:
//       console.log(`No function defined for service ${services}`);
//   }
// };


</script>

<template>
  <div class="p-2 mx-3 bg-white my-3">
    <div class="px-2 mb-2 mt-4">
      <h2 class="font-bold font-md m-1">Services</h2>
      <div class="h-px w-full bg-slate-200"></div>
    </div>

    <div class="rounded">
      <div class="grid grid-cols-3 gap-2">
        <button
          @click="$emit('serviceClicked', service)"
          v-for="service in services"
          :key="service.id"
          class="p-2 hover:bg-gray-100"
        >
          <img class="w-[3em] mx-auto" :src="service.path" alt="" />
          <h4 class="text-[0.7rem] text-center font-semibold">
            {{ service.name }}
          </h4>
        </button>
      </div>
    </div>
  
  </div>
</template>
