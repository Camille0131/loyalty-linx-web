<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const unpaid = ref([]);
const credits = ref([]);

const router = useRouter();
const selectedPaymentMethod = ref("");
unpaid.value = JSON.parse(sessionStorage.getItem("unpaidStatus"));
credits.value = JSON.parse(localStorage.getItem("paymentItem"));

const selectPaymentMethod = (methodName) => {
  // Clear any previously selected payment method
  selectedPaymentMethod.value = "";

  // Set the selected payment method to the current method
  selectedPaymentMethod.value = methodName;

  // You can also add additional logic here to handle the selected payment method
};

const paymentMethods = [
  {
    name: "G Cash ",
    logo: "https://seeklogo.com/images/G/gcash-logo-E93133FDA5-seeklogo.com.png",
  },
  {
    name: "Union Bank",
    logo: "https://play-lh.googleusercontent.com/xeCakfcf3dDyUovyFd7CiAL_5LoS6W7n83f7jo4GqwFZBjhPR9MO9HuUgttmYPnOe7A",
  },
  {
    name: "Metro Bank",
    logo: "https://companieslogo.com/img/orig/MTPOY-1a51b472.png?t=1720244493",
  },
  {
    name: "7/11",
    logo: "data:image/png;base64,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",
  },
];

const handleBack = () => {
  router.back();
};
</script>

<template>
  <div class="px-2">
    <div class="p-5">
      <svg
        @click="handleBack"
        fill="#111827"
        class="w-8"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 26.676 26.676"
        xml:space="preserve"
      >
        <g>
          <path
            d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
		c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
		C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
		c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
		C26.18,21.891,26.141,21.891,26.105,21.891z"
          />
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </g>
      </svg>
    </div>
    <div>
      <h2 class="text-center font-bold pb-5 text-2xl">Select Payment Method</h2>
    </div>
    <div class="bg-white mx-6 p-8 flex shadow-2 flex-col">
      <div>
        <p class="text-sm text-gray-400">Current Amount Due:</p>
        <p class="text-3xl font-medium text-gray-700">
          {{
            new Intl.NumberFormat("en-PH", {
              style: "decimal",
              minimumFractionDigits: 2,
            }).format(credits.creditAmount)
          }}
        </p>
      </div>
      <div class="mt-4 flex">
        <div class="mr-10">
          <p class="text-sm text-gray-400">Payment Date:</p>
          <p class="text-lg font-medium text-gray-700">{{ unpaid }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-400">Payment Amount:</p>
          <p class="text-lg font-medium text-gray-700">
            {{
              new Intl.NumberFormat("en-PH", {
                style: "decimal",
                minimumFractionDigits: 2,
              }).format(credits.monthlyInstallment)
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="bg-white p-2 mt-6 rounded-sm">
      <div v-for="(item, index) in paymentMethods" :key="index">
        <div
          @click="selectPaymentMethod(item.name)"
          class="flex m-2 items-center justify-between rounded-md shadow-3 p-4 hover:bg-gray-50"
        >
          <div class="w-15 mx-2">
            <img :src="item.logo" alt="" />
          </div>

          <label
            for="bordered-checkbox-2"
            class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <p class="text-gray-700 font-medium">
              {{ item.name }}
            </p></label
          >
          <input
            :id="`checkbox-${index}`"
            type="checkbox"
            :value="item.name"
            name="bordered-checkbox"
            v-model="selectedPaymentMethod"
            :checked="selectedPaymentMethod === item.name"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <!-- </div> -->
      </div>
      <div class="px-6 mt-8">
        <button
          type="submit"
          class="w-full py-3 px-4 text-lg tracking-wide rounded-full text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
        >
          Pay
          {{
            new Intl.NumberFormat("en-PH", {
              style: "decimal",
              minimumFractionDigits: 2,
            }).format(credits.monthlyInstallment)
          }}
        </button>
        <button
          class="w-full py-3 px-4 text-lg tracking-wide rounded-full mt-5 text-white bg-white border border-amber-700 hover:bg-gray-200 focus:outline-none"
        >
          <router-link to="/credits">
            <h1 class="text-amber-600">CANCEL</h1>
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
