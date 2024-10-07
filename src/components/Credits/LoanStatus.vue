<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const loanMonitor = JSON.parse(sessionStorage.getItem("loanMonitorStatus"));
const montlyAmount = loanMonitor.monthlyInstallment;
const formattedCreditAmount = computed(() => {
  return new Intl.NumberFormat("en-PH", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(montlyAmount);
});

const repayLog = loanMonitor.paymentLog;
const today = new Date();
const unpaidPayments = repayLog.filter((item) => item.status === "unpaid");

const nearestUnpaidDateUpdate = unpaidPayments.reduce(
  (min, current) => {
    const diff = Math.abs(today - new Date(current.paymentDate));
    return diff < min.diff ? { diff, paymentDate: current.paymentDate } : min;
  },
  { diff: Infinity, paymentDate: null }
).paymentDate;
const formattedDueDate = computed(() => {
  return nearestUnpaidDateUpdate
    ? new Intl.DateTimeFormat("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(nearestUnpaidDateUpdate.paymentDate))
    : "No unpaid payments";
});

const handleBack = () => {
  router.back();
};
</script>
<template>
  <div class="p-5">
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

    <div class="text-center text-neutral-900 bg-white py-6 rounded-sm">
      <div class="flex justify-center align-center items-center">
        <div class="w-15 mr-4">
          <img :src="loanMonitor.merchantLogo" alt="" class="" />
        </div>
        <h2 class="text-2xl font-semibold">
          {{ loanMonitor.merchantName }}
        </h2>
      </div>
      <div class="border border-gray-400 m-2"></div>
      <div class="mt-10 text-sm">
        <h2>NEXT PAYMET DUE</h2>
        <h1 class="text-xl font-medium">{{ formattedCreditAmount }}</h1>
      </div>
      <div class="mt-10 text-sm">
        <h2>DUE DATE</h2>
        <h1 class="text-xl">
          {{
            nearestUnpaidDateUpdate
              ? new Intl.DateTimeFormat("en-PH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(nearestUnpaidDateUpdate))
              : "No unpaid payments"
          }}
        </h1>
      </div>
    </div>
  </div>

  <div>
    <div class="relative overflow-x-auto mb-4 px-5">
      <table class="w-full text-sm text-right rtl:text-left">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
        >
          <tr>
            <th scope="col" class="px-6 py-3 rounded-s-lgt text-xm text-center">
              Month
            </th>
            <th scope="col" class="px-6 py-3 rounded-s-lgt text-xm text-center">
              Pay Date
            </th>
            <th scope="col" class="px-6 py-3 rounded-e-lg text-xm text-center">
              Amount Due
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in loanMonitor.paymentLog"
            :key="index"
            class="bg-white dark:bg-gray-800"
          >
            <td
              scope="row"
              class="px-4 py-8 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div class="flex flex-row justify-evenly">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  enable-background="new 0 0 64 64"
                  class="w-4"
                >
                  <path
                    d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50
                l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
                    :fill="item.status === 'unpaid' ? '#ccc' : '#43a047'"
                  />
                </svg>
                <p>{{ index + 1 }}</p>
              </div>
            </td>
            <td class="px-6 py-8 text-gray-600">
              {{
                new Intl.DateTimeFormat("en-PH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(item.paymentDate))
              }}
            </td>
            <td class="px-6 py-8 text-gray-900 font-meduim">
              {{
                new Intl.NumberFormat("en-PH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                }).format(item.paymentAmount)
              }}
            </td>
          </tr>
        </tbody>
        <!-- <tfoot>
          <tr class="font-semibold text-gray-900 dark:text-white">
            <th scope="row" class="px-6 py-3 text-base">Total</th>
            <td class="px-6 py-3">3</td>
            <td class="px-6 py-3">21,000</td>
          </tr>
        </tfoot> -->
      </table>
    </div>
  </div>
</template>
