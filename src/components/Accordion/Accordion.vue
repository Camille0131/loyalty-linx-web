<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const props = defineProps(["order"]);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="border rounded-lg shadow-md">
    <div
      class="bg-gray-100 flex justify-between items-center p-4 cursor-pointer"
      @click="toggleAccordion"
    >
      <h2 class="text-lg font-semibold">View Details</h2>
      <svg
        :class="{ 'rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <div
      v-if="isOpen"
      class="p-4 border-t bg-white"
      style="animation: fadeIn 0.3s"
    >
      <div
        v-for="item in order.orderDetails"
        :key="item"
        class="bg-white border rounded-lg p-4 flex md:flex-row items-center space-x-4 mb-2"
      >
        <!-- Product Image (Responsive) -->
        <div class="w-40">
          <img
            :src="item.image"
            alt="Product Image"
            class="w-20 md:w-1/3 object-cover rounded-sm h-auto"
          />
        </div>

        <!-- Product Details (Responsive) -->
        <div class="flex-col ml-0">
          <h3 class="">{{ item.name }}</h3>
          <p class="text-amber-600 font-semibold">
            <!-- ₱ -->
            {{
              new Intl.NumberFormat("en-PH", {
                style: "decimal",
                minimumFractionDigits: 2,
              }).format(item.price)
            }}
          </p>

          <!-- Quantity Control -->
          <div class="flex items-center mt-2 w-full">
            <div class="w-10">
              <p
                type="text"
                class="text-center py-1 border text-xs border-gray-300 focus:outline-none"
                readonly
              >
                {{ item.quantity }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
